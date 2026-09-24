const jwt = require('jsonwebtoken')

const jwtSecret = () => process.env.JWT_SECRET || 'urbanlink_super_secret_2023_please_change'

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization || ''
  const [scheme, token] = authorization.split(' ')
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Authentification requise' })

  try {
    const decoded = jwt.verify(token, jwtSecret())
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Authentification invalide' })
  }
}

const requireAgent = (req, res, next) => {
  if (!req.user || !['agent', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Droits insuffisants' })
  }
  next()
}

module.exports = { verifyToken, requireAgent }
