/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('userinfo', table => {
    table.increments('id').primary()
    table.date('birthday')
    table.string('fname')
    table.string('lname')
    table.string('nationality')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  knex.schema.dropTable('userinfo')
}
