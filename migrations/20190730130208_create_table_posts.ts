import * as Knex from 'knex'

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('posts', table => {
    table.increments('id').primary()
    table.string('titulo').notNullable()
    table.string('conteudo').notNullable()
    table
      .integer('pessoaId')
      .references('id')
      .inTable('pessoas')
      .notNullable()
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('posts')
}
