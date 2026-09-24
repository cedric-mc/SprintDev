const path = require('path')

process.env.NODE_ENV = 'test'
process.env.DB_PATH = ':memory:'

const request = require('supertest')
const db = require('../src/config/db')
const app = require('../src/index')

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message' }),
  })),
}))

const nodemailer = require('nodemailer')
const { processPendingEmails, queueConfirmation } = require('../src/services/email')

describe('API routes', () => {
  beforeAll(async () => {
    await db.migrate.latest({ directory: path.join(__dirname, '../db/migrations') })
  })

  beforeEach(async () => {
    await db('email_deliveries').delete()
    await db('signalements').delete()
    await db('mairies').delete()
    await db('mairies').insert({
      id: 1,
      nom: 'Mairie de test',
      ville: 'Lyon',
      code_postal: '69001',
      email: 'mairie@test.fr',
      latitude: 45.764,
      longitude: 4.835,
    })
  })

  afterAll(async () => {
    await db.destroy()
  })

  test('GET /health returns the API status', async () => {
    const response = await request(app).get('/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
    expect(response.body.timestamp).toBeDefined()
  })

  test('GET /api/mairies returns the available municipalities', async () => {
    const response = await request(app).get('/api/mairies')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].nom).toBe('Mairie de test')
  })

  test('GET /api/mairies/:id returns a municipality with its reports', async () => {
    await db('signalements').insert({
      titre: 'Nid-de-poule',
      description: 'Rue dégradée',
      categorie: 'Voirie',
      latitude: 45.764,
      longitude: 4.835,
      mairie_id: 1,
      citoyen_email: 'citoyen@test.fr',
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    const response = await request(app).get('/api/mairies/1')

    expect(response.status).toBe(200)
    expect(response.body.nom).toBe('Mairie de test')
    expect(response.body.signalements).toHaveLength(1)
  })

  test('GET /api/mairies/:id returns 404 for an unknown municipality', async () => {
    const response = await request(app).get('/api/mairies/999')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Not found')
  })

  test('GET /api/signalements returns reports with their municipality', async () => {
    await db('signalements').insert({
      titre: 'Éclairage en panne',
      description: 'Lampadaire hors service',
      categorie: 'Éclairage',
      latitude: 45.764,
      longitude: 4.835,
      mairie_id: 1,
      citoyen_email: 'citoyen@test.fr',
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    const response = await request(app).get('/api/signalements')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].mairie.nom).toBe('Mairie de test')
  })

  test('GET /api/signalements/:id returns a report and handles 404', async () => {
    const [id] = await db('signalements').insert({
      titre: 'Déchet abandonné',
      description: 'À retirer',
      categorie: 'Propreté',
      mairie_id: 1,
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    const found = await request(app).get(`/api/signalements/${id}`)
    const missing = await request(app).get('/api/signalements/999')

    expect(found.status).toBe(200)
    expect(found.body.titre).toBe('Déchet abandonné')
    expect(missing.status).toBe(404)
  })

  test('POST /api/signalements creates a report and sends a confirmation', async () => {
    const response = await request(app)
      .post('/api/signalements')
      .send({
        titre: 'Banc cassé',
        description: 'Le dossier est cassé',
        categorie: 'Mobilier urbain',
        latitude: '45.764',
        longitude: '4.835',
        mairie_id: '1',
        citoyen_email: 'citoyen@test.fr',
      })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    await expect(db('signalements').where('id', response.body.id).first())
      .resolves.toMatchObject({ titre: 'Banc cassé', statut: 'recu' })
    await expect(db('email_deliveries').where('recipient', 'citoyen@test.fr').first())
      .resolves.toMatchObject({
        status: 'sent',
        subject: `Votre signalement #${response.body.id} a été reçu`,
      })
    const delivery = await db('email_deliveries').where('recipient', 'citoyen@test.fr').first()
    expect(delivery.text).toContain('Catégorie : Mobilier urbain')
    expect(delivery.text).toContain('Statut : recu')
    expect(delivery.text).toContain(`/signalements/${response.body.id}`)
  })

  test('POST /api/signalements rejects invalid report data', async () => {
    const response = await request(app)
      .post('/api/signalements')
      .send({
        titre: '',
        description: 'court',
        categorie: 'Voirie',
        latitude: '120',
        longitude: '4.835',
        mairie_id: '1',
        citoyen_email: 'email-invalide',
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Les données du signalement sont invalides')
    expect(response.body.details).toEqual(expect.arrayContaining([
      'Le titre doit contenir entre 3 et 120 caractères',
      'La latitude doit être comprise entre -90 et 90',
      'Une adresse email valide est obligatoire',
    ]))
  })

  test('email delivery records SMTP failures after retries', async () => {
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error('SMTP indisponible')),
    })
    const deliveryId = await queueConfirmation({
      id: 42,
      citoyen_email: 'citoyen@test.fr',
      categorie: 'Voirie',
      description: 'Une description suffisamment longue',
    })

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await processPendingEmails()
      await db('email_deliveries').where('id', deliveryId).update({ next_attempt_at: new Date(0).toISOString() })
    }

    await expect(db('email_deliveries').where('id', deliveryId).first())
      .resolves.toMatchObject({ status: 'failed', attempts: 3, last_error: 'SMTP indisponible' })
  })

  test('POST /api/signalements rejects non-image uploads', async () => {
    const response = await request(app)
      .post('/api/signalements')
      .field('titre', 'Photo interdite')
      .field('description', 'Une description suffisamment longue')
      .field('categorie', 'Voirie')
      .field('latitude', '45.764')
      .field('longitude', '4.835')
      .field('mairie_id', '1')
      .field('citoyen_email', 'citoyen@test.fr')
      .attach('photo', Buffer.from('not an image'), 'document.txt')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Le fichier doit être une image JPEG, PNG ou WebP')
  })

  test('PATCH /api/signalements/:id/statut updates a report', async () => {
    const [id] = await db('signalements').insert({
      titre: 'Arbre tombé',
      description: 'Intervention nécessaire',
      categorie: 'Espaces verts',
      mairie_id: 1,
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    const response = await request(app)
      .patch(`/api/signalements/${id}/statut`)
      .send({ statut: 'en_cours' })

    expect(response.status).toBe(200)
    await expect(db('signalements').where('id', id).first())
      .resolves.toMatchObject({ statut: 'en_cours' })
  })

  test('DELETE /api/signalements/:id deletes a report', async () => {
    const [id] = await db('signalements').insert({
      titre: 'À supprimer',
      mairie_id: 1,
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    const response = await request(app).delete(`/api/signalements/${id}`)

    expect(response.status).toBe(200)
    await expect(db('signalements').where('id', id)).resolves.toHaveLength(0)
  })

  test('GET /api/admin/stats returns report statistics', async () => {
    await db('signalements').insert({
      titre: 'Statistique',
      mairie_id: 1,
      statut: 'resolu',
      created_at: new Date().toISOString(),
    })

    const response = await request(app).get('/api/admin/stats')

    expect(response.status).toBe(200)
    expect(response.body.totalSignalements.count).toBe(1)
    expect(response.body.parStatut[0].statut).toBe('resolu')
    expect(response.body.recentsAvecEmails).toHaveLength(1)
  })

  test('DELETE /api/admin/signalements/purge removes old reports', async () => {
    await db('signalements').insert({
      titre: 'Ancien signalement',
      mairie_id: 1,
      statut: 'recu',
      created_at: '2020-01-01T00:00:00.000Z',
    })

    const response = await request(app)
      .delete('/api/admin/signalements/purge?avant_le=2021-01-01T00:00:00.000Z')

    expect(response.status).toBe(200)
    expect(response.body.deleted).toBe(1)
  })

  test('debug routes expose the test database and can reset reports', async () => {
    await db('signalements').insert({
      titre: 'Debug report',
      mairie_id: 1,
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    const dump = await request(app).get('/api/debug/dump')
    const reset = await request(app).post('/api/debug/reset')

    expect(dump.status).toBe(200)
    expect(dump.body.signalements).toHaveLength(1)
    expect(reset.status).toBe(200)
    await expect(db('signalements')).resolves.toHaveLength(0)
  })
})
