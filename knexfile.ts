// Update with your config settings.
import * as knex from 'knex'

const database = {
  client: 'postgresql',
  connection: {
    database: 'empatia',
    user: 'postgres',
    password: 'root'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
} as knex.Config

export default database
