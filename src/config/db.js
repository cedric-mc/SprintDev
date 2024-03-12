const knex = require('knex')
require('dotenv').config()

// Connexion SQLite — pas de pool, pas de gestion d'erreur
const db = knex({
  client: 'better-sqlite3',
  connection: { filename: process.env.DB_PATH || './db/urbanlink.db' },
  useNullAsDefault: true,
})

module.exports = db
