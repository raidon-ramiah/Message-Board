export async function seed(knex) {
  await knex('boards').insert([
    {
      id: 1,
      name: 'Styling',
      tag: 'trying to find new ideas',
      added_by_user: 'auth0|123',
      timestamp: 11022001,
    },
    {
      id: 2,
      name: 'Layout',
      tag: 'important',
      added_by_user: 'auth0|123',
      timestamp: 11022001,
    },
    {
      id: 3,
      name: 'Features',
      tag: 'brainstorm',
      added_by_user: 'auth0|123',
      timestamp: 11022001,
    },
  ])
}
