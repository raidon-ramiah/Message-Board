export async function seed(knex) {
  await knex('messages').insert([
    {
      id: 1,
      message: 'Add a yellow background',
      love: 120,
      added_by_user: 'auth0|123',
    },
    {
      id: 2,
      message: 'Create a section to add and delete messages',
      love: 1,
      added_by_user: 'auth0|456',
    },
    {
      id: 3,
      message: 'Add messages into seperable boards',
      love: 5,
      added_by_user: 'auth0|123',
    },
  ])
}
