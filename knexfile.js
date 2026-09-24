require('dotenv').config()

module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: process.env.DB_PATH || './db/urbanlink.db',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
  },
  test: {
    client: 'better-sqlite3',
    connection: {
      filename: process.env.DB_PATH || ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
  },
}