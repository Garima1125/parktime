// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      database : process.env.DB_NAME,
      password : process.env.DB_PASS,
      port : process.env.DB_PORT,
      ssl : process.env.DB_SSL 
    },

    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}