// Données de test — à exécuter avec : node db/seed.js
// Baptiste l'utilisait pour reset la DB en dev

const db = require('../src/config/db')

async function seed() {
  // Reset brutal — attention en prod
  await db('signalements').delete()
  await db('mairies').delete()

  await db('mairies').insert([
    { id: 1, nom: 'Mairie du 1er arrondissement', ville: 'Lyon', code_postal: '69001',
      email: 'mairie1@lyon.fr', latitude: 45.7640, longitude: 4.8357 },
    { id: 2, nom: 'Mairie du 2ème arrondissement', ville: 'Lyon', code_postal: '69002',
      email: 'mairie2@lyon.fr', latitude: 45.7485, longitude: 4.8277 },
    { id: 3, nom: 'Mairie du 3ème arrondissement', ville: 'Lyon', code_postal: '69003',
      email: 'mairie3@lyon.fr', latitude: 45.7578, longitude: 4.8549 },
  ])

  const categories = ['Voirie', 'Éclairage', 'Propreté', 'Espaces verts', 'Mobilier urbain', 'Autre']
  const statuts = ['recu', 'recu', 'en_cours', 'en_cours', 'resolu']

  const signalements = []
  for (let i = 1; i <= 87; i++) {
    signalements.push({
      titre: `Signalement test #${i}`,
      description: `Description du problème ${i}. Merci de traiter rapidement.`,
      categorie: categories[i % categories.length],
      latitude:  45.748 + (Math.random() * 0.04 - 0.02),
      longitude: 4.830  + (Math.random() * 0.04 - 0.02),
      statut: statuts[i % statuts.length],
      citoyen_email: `citoyen${i}@test.fr`,
      mairie_id: (i % 3) + 1,
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
    })
  }

  await db('signalements').insert(signalements)
  console.log(`Seed OK — ${signalements.length} signalements créés`)
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
