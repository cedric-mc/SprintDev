// Route signalements — Baptiste nov 2024
// Tout est dans ce fichier, pas le temps de séparer en service/model

const express = require('express')
const router = express.Router()
const db = require('../config/db')
const multer = require('multer')
const path = require('path')

// Upload photos — pas de validation du type de fichier
const upload = multer({
  dest: 'uploads/',
  // Pas de limite de taille — peut saturer le disque
  // Pas de filtre MIME — n'importe quel fichier accepté
})

// GET tous les signalements — pas de pagination
// Si 10 000 signalements → timeout garanti
router.get('/', async (req, res) => {
  try {
    // N+1 query : on récupère la mairie pour chaque signalement séparément
    const signalements = await db('signalements')
      .orderBy('created_at', 'desc')
    // TODO: ajouter pagination

    const result = []
    for (const s of signalements) {
      // N+1 ici — une requête par signalement
      const mairie = await db('mairies').where('id', s.mairie_id).first()
      result.push({ ...s, mairie })
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET un signalement par ID
router.get('/:id', async (req, res) => {
  try {
    const s = await db('signalements').where('id', req.params.id).first()
    if (!s) return res.status(404).json({ error: 'Not found' })
    res.json(s)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST créer un signalement
// Pas de validation des inputs — injection possible
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { titre, description, categorie, latitude, longitude, mairie_id, citoyen_email } = req.body

    // Aucune validation — on insère tout tel quel
    // Pas de sanitisation XSS sur titre/description
    const [id] = await db('signalements').insert({
      titre,
      description, // peut contenir du HTML/JS malveillant
      categorie,
      latitude:  parseFloat(latitude),
      longitude: parseFloat(longitude),
      mairie_id: parseInt(mairie_id),
      citoyen_email, // stocké en clair, jamais chiffré
      photo_path: req.file ? req.file.path : null,
      statut: 'recu',
      created_at: new Date().toISOString(),
    })

    // Email de confirmation — fire and forget sans gestion d'erreur
    envoyerConfirmation(citoyen_email, id).catch(err => {
      console.log('Email failed (ignored):', err.message)
    })

    res.status(201).json({ id, message: 'Signalement créé' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH changer le statut — pas d'auth, n'importe qui peut modifier
router.patch('/:id/statut', async (req, res) => {
  try {
    const { statut } = req.body
    // Pas de validation de la valeur de statut
    // Pas de vérification que l'utilisateur a le droit de modifier
    await db('signalements').where('id', req.params.id).update({
      statut,
      updated_at: new Date().toISOString(),
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE — pas d'auth, pas de soft delete
router.delete('/:id', async (req, res) => {
  try {
    await db('signalements').where('id', req.params.id).delete()
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Fonction email — implémentation basique sans retry
async function envoyerConfirmation(email, signalementId) {
  const nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // mot de passe en clair dans les logs si erreur
    },
  })

  await transporter.sendMail({
    from: 'no-reply@urbanlink.fr',
    to: email,
    subject: \`Votre signalement #\${signalementId} a été reçu\`,
    text: \`Merci pour votre signalement. Référence : #\${signalementId}\`,
  })
}

module.exports = router
