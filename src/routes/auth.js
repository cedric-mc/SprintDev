const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const asyncHandler = require('../middleware/asyncHandler')
const { HttpError } = require('../middleware/errorHandler')
const { verifyPassword } = require('../services/passwords')

const router = express.Router()

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) throw new HttpError(400, 'Email et mot de passe requis')

  const agent = await db('agents').where({ email: email.trim().toLowerCase() }).first()
  if (!agent || !verifyPassword(password, agent.password_hash)) {
    throw new HttpError(401, 'Identifiants invalides')
  }

  const token = jwt.sign(
    { id: agent.id, email: agent.email, role: agent.role, mairie_id: agent.mairie_id },
    process.env.JWT_SECRET || 'urbanlink_super_secret_2023_please_change',
    { expiresIn: '8h' },
  )
  res.json({ token, user: { id: agent.id, email: agent.email, role: agent.role, mairie_id: agent.mairie_id } })
}))

module.exports = router