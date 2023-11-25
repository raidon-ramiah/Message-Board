export async function up(knex) {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary()
    table.string('message')
    table.integer('love')
    table.string('added_by_user')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('messages')
}
