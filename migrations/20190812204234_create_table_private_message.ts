import * as Knex from 'knex'

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('messages', table => {
    table.increments('id').primary()
    table.string('conteudo').notNullable()
    table.string('remetente').notNullable()
  })
}

export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('messages')
}
