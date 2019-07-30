export const up = (knex: any, promise: Promise<any>) => {
  return knex.schema.createTable('pessoas', table => {
    table.increments('id').primary()
    table.string('nome').notNull()
    table
      .string('email')
      .notNull()
      .unique()
    table.string('password').notNull()
  })
}
export const down = (knex: any, promise: Promise<any>) => {
  return knex.dropTable('pessoas')
}

// 7vDQuVEA5sGn