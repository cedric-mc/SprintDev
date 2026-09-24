// Routes admin — AUCUNE PROTECTION en place
// Baptiste "ajoutera l'auth plus tard"

const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { verifyToken, requireAgent } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')

router.use(verifyToken, requireAgent)

router.get('/signalements', asyncHandler(async (req, res) => {
  const { debut, fin } = getDateRange(req.query)
  const query = db('signalements').orderBy('created_at', 'desc')
  if (req.user.role !== 'admin') query.where('mairie_id', req.user.mairie_id)
  query.where('created_at', '>=', debut).where('created_at', '<', fin)
  res.json(await query.select('id', 'titre', 'description', 'categorie', 'statut', 'mairie_id', 'created_at'))
}))

// Dashboard admin — retourne des données sensibles sans auth
router.get('/stats', async (req, res) => {
  try {
    const { debut, fin } = getDateRange(req.query)
    const scope = req.user.role === 'admin' ? {} : { 's.mairie_id': req.user.mairie_id }
    const filtered = query => query.where(scope)
      .where('s.created_at', '>=', debut)
      .where('s.created_at', '<', fin)
    const totalSignalements = await filtered(db('signalements as s')).count('s.id as count').first()
    const parStatut = await filtered(db('signalements as s'))
      .groupBy('statut')
      .select('s.statut')
      .count('s.id as count')
    const parCategorie = await filtered(db('signalements as s'))
      .groupBy('s.categorie')
      .select('s.categorie')
      .count('s.id as count')
      .orderBy('count', 'desc')

    const resolvedEvents = db('statut_historique')
      .select('signalement_id')
      .min('created_at as resolu_at')
      .where('nouveau_statut', 'resolu')
      .groupBy('signalement_id')
      .as('resolved')
    const processingRows = await filtered(db('signalements as s')
      .join(resolvedEvents, 'resolved.signalement_id', 's.id')
      .select('s.created_at', 'resolved.resolu_at'))
    const averageProcessingHours = processingRows.length
      ? processingRows.reduce((total, row) => total + (new Date(row.resolu_at) - new Date(row.created_at)) / 3600000, 0) / processingRows.length
      : null

    const recents = await filtered(db('signalements as s'))
      .orderBy('s.created_at', 'desc')
      .limit(10)
      .select('s.id', 's.titre', 's.categorie', 's.statut', 's.mairie_id', 's.created_at')

    res.json({
      periode: { debut: debut.slice(0, 10), fin: new Date(new Date(fin).getTime() - 86400000).toISOString().slice(0, 10) },
      totalSignalements,
      parStatut,
      parCategorie,
      delaiMoyenTraitementHeures: averageProcessingHours === null ? null : Number(averageProcessingHours.toFixed(2)),
      recents,
    })
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message, details: err.details })
    res.status(500).json({ error: 'Impossible de calculer les statistiques' })
  }
})

function getDateRange (query) {
  const today = new Date()
  const defaultStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - ((today.getUTCDay() + 6) % 7)))
  const startValue = query.debut || defaultStart.toISOString().slice(0, 10)
  const endValue = query.fin || new Date(defaultStart.getTime() + 6 * 86400000).toISOString().slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startValue) || !/^\d{4}-\d{2}-\d{2}$/.test(endValue) || startValue > endValue) {
    const error = new Error('La période statistique est invalide')
    error.status = 400
    error.details = ['Les dates doivent être au format YYYY-MM-DD et debut doit précéder fin']
    throw error
  }
  const exclusiveEnd = new Date(`${endValue}T00:00:00.000Z`)
  exclusiveEnd.setUTCDate(exclusiveEnd.getUTCDate() + 1)
  return { debut: `${startValue}T00:00:00.000Z`, fin: exclusiveEnd.toISOString() }
}

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
