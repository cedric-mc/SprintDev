exports.up = function(knex) {
  return knex.schema.createTable('email_deliveries', table => {
    table.increments('id')
    table.string('recipient').notNullable()
    table.string('subject').notNullable()
    table.text('text').notNullable()
    table.string('status').notNullable().defaultTo('pending')
    table.integer('attempts').notNullable().defaultTo(0)
    table.text('last_error')
    table.string('sent_at')
    table.string('next_attempt_at').notNullable()
    table.string('created_at').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('email_deliveries')
}