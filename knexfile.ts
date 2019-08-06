// Update with your config settings.

export default {
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
}
