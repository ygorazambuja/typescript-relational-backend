import * as Knex from 'knex'

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('comentarios', table => {
    table.increments('id').primary()
    table.string('conteudo').notNullable()
    table
      .integer('postId')
      .references('id')
      .inTable('posts')
      .notNullable()
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('comentarios')
}
