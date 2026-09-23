exports.up = function(knex) {
  return knex.schema.alterTable('agents', table => {
    table.string('password_hash')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('agents', table => {
    table.dropColumn('password_hash')
  })
}
