// Routes admin — AUCUNE PROTECTION en place
// Baptiste "ajoutera l'auth plus tard"

const express = require('express')
const router = express.Router()
const db = require('../config/db')

// Dashboard admin — retourne des données sensibles sans auth
router.get('/stats', async (req, res) => {
  try {
    const totalSignalements = await db('signalements').count('id as count').first()
    const parStatut = await db('signalements')
      .groupBy('statut')
      .select('statut')
      .count('id as count')

    // Expose aussi les emails des citoyens dans les stats — RGPD !
    const recentsAvecEmails = await db('signalements')
      .orderBy('created_at', 'desc')
      .limit(10)
      .select('*') // sélectionne citoyen_email en clair

    res.json({ totalSignalements, parStatut, recentsAvecEmails })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Suppression en masse — sans auth, sans confirmation
router.delete('/signalements/purge', async (req, res) => {
  try {
    const { avant_le } = req.query
    const deleted = await db('signalements')
      .where('created_at', '<', avant_le)
      .delete()
    res.json({ deleted, message: 'Purge effectuée' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
