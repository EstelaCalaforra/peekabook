/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('userinfo').del()
  await knex('userinfo').insert([
    { birthday: new Date('1996-04-22'), fname: 'Estela', lname: 'Calaforra', nationality: 'Spanish' },
    { birthday: new Date('1961-11-21'), fname: 'Inma', lname: 'Ayuso', nationality: 'Spanish' }
  ])
}
