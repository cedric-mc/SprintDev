// Routes admin — AUCUNE PROTECTION en place
// Baptiste "ajoutera l'auth plus tard"

const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { verifyToken, requireAgent } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')

router.use(verifyToken, requireAgent)

router.get('/signalements', asyncHandler(async (req, res) => {
  const query = db('signalements').orderBy('created_at', 'desc')
  if (req.user.role !== 'admin') query.where('mairie_id', req.user.mairie_id)
  res.json(await query.select('id', 'titre', 'description', 'categorie', 'statut', 'mairie_id', 'created_at'))
}))

// Dashboard admin — retourne des données sensibles sans auth
router.get('/stats', async (req, res) => {
  try {
    const scope = req.user.role === 'admin' ? {} : { mairie_id: req.user.mairie_id }
    const totalSignalements = await db('signalements').where(scope).count('id as count').first()
    const parStatut = await db('signalements').where(scope)
      .groupBy('statut')
      .select('statut')
      .count('id as count')

    // Expose aussi les emails des citoyens dans les stats — RGPD !
    const recents = await db('signalements')
      .where(scope)
      .orderBy('created_at', 'desc')
      .limit(10)
      .select('id', 'titre', 'categorie', 'statut', 'mairie_id', 'created_at')

    res.json({ totalSignalements, parStatut, recents })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Suppression en masse — sans auth, sans confirmation
router.delete('/signalements/purge', async (req, res) => {
  try {
    const { avant_le } = req.query
    let query = db('signalements').where('created_at', '<', avant_le)
    if (req.user.role !== 'admin') query = query.andWhere('mairie_id', req.user.mairie_id)
    const deleted = await query
      .delete()
    res.json({ deleted, message: 'Purge effectuée' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
