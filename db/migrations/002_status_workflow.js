exports.up = async function(knex) {
  await knex.schema.createTable('agents', table => {
    table.increments('id').primary()
    table.string('email').notNullable().unique()
    table.string('role').notNullable().defaultTo('agent')
    table.integer('mairie_id').notNullable()
      .references('id').inTable('mairies').onDelete('CASCADE')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('statut_historique', table => {
    table.increments('id').primary()
    table.integer('signalement_id').notNullable()
      .references('id').inTable('signalements').onDelete('CASCADE')
    table.string('ancien_statut').notNullable()
    table.string('nouveau_statut').notNullable()
    table.integer('agent_id').notNullable()
      .references('id').inTable('agents').onDelete('RESTRICT')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.unique(['signalement_id', 'created_at', 'agent_id'])
  })

  await knex.schema.alterTable('signalements', table => {
    table.index(['mairie_id', 'statut'], 'signalements_mairie_statut_idx')
  })
}

exports.down = async function(knex) {
  await knex.schema.alterTable('signalements', table => {
    table.dropIndex(['mairie_id', 'statut'], 'signalements_mairie_statut_idx')
  })
  await knex.schema.dropTableIfExists('statut_historique')
  await knex.schema.dropTableIfExists('agents')
}
