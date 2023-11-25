export async function seed(knex) {
  await knex('messages').del()
}
