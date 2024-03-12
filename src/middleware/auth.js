// Middleware JWT — écrit mais jamais utilisé
// Désactivé car bug d'expiration de token (Rayan, mars 2024)
// TODO : débugger et réactiver dans index.js

const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'urbanlink_super_secret_2023_please_change' // fallback dangereux
    )
    req.user = decoded
    next()
  } catch (err) {
    // Les tokens expirés retournent une 401 — c'est le bug signalé
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { verifyToken }
