export async function up(knex) {
  await knex.schema.createTable('boards', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('tag')
    table.string('added_by_user')
    table.date('timestamp')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('boards')
}
