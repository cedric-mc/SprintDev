const express = require('express')
const router = express.Router()
const db = require('../config/db')

// GET toutes les mairies — pas de cache
router.get('/', async (req, res) => {
  try {
    const mairies = await db('mairies').select('*')
    res.json(mairies)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET une mairie avec ses signalements — query très lourde
router.get('/:id', async (req, res) => {
  try {
    const mairie = await db('mairies').where('id', req.params.id).first()
    if (!mairie) return res.status(404).json({ error: 'Not found' })

    // Charge TOUS les signalements de la mairie sans pagination
    const signalements = await db('signalements')
      .where('mairie_id', req.params.id)
      .orderBy('created_at', 'desc')

    res.json({ ...mairie, signalements })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
