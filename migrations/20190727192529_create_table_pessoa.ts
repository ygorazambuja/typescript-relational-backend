import * as Knex from 'knex'

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('pessoas', table => {
    table.increments('id').primary()
    table.string('nome').notNullable()
    table
      .string('email')
      .notNullable()
      .unique()
    table.string('password').notNullable()
  })
}
export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('pessoas')
}

// 7vDQuVEA5sGn
