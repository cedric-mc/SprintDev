// Routes de debug — JAMAIS déployer en prod
// Ajoutées par Baptiste pour tester rapidement

const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Retourne TOUTE la base de données
router.get('/dump', async (req, res) => {
  const signalements = await db('signalements').select('*')
  const mairies = await db('mairies').select('*')
  const config = {
    env: process.env.NODE_ENV,
    db: process.env.DB_PATH,
    jwt: process.env.JWT_SECRET, // expose le secret !
    smtp: { host: process.env.SMTP_HOST, user: process.env.SMTP_USER }
  }
  res.json({ signalements, mairies, config })
})

// Reset de la DB — dangereux
router.post('/reset', async (req, res) => {
  await db('signalements').delete()
  res.json({ message: 'DB reset OK' })
})

module.exports = router
