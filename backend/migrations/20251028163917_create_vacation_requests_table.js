/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('vacation_requests', table => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.date('start_date').notNullable()
    table.date('end_date').notNullable()
    table.text('reason')
    table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
    table.text('comments')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    
    table.foreign('user_id').references('id').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vacation_requests')
}
