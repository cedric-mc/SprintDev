// Migration initiale — Baptiste, sept 2023
// Schéma minimal, pas de contraintes, pas d'index

exports.up = function(knex) {
  return knex.schema

    .createTable('mairies', table => {
      table.increments('id')
      table.string('nom').notNullable()
      table.string('ville').notNullable()
      table.string('code_postal', 5)
      table.string('email')
      table.string('telephone')
      table.float('latitude')
      table.float('longitude')
      // Pas de timestamps — oublié
    })

    .createTable('signalements', table => {
      table.increments('id')
      table.string('titre').notNullable()
      table.text('description')
      table.string('categorie') // pas d'ENUM, n'importe quelle valeur acceptée
      table.float('latitude')
      table.float('longitude')
      table.string('statut').defaultTo('recu') // recu / en_cours / resolu
      table.string('citoyen_email') // clair, jamais hashé — RGPD ?
      table.string('photo_path')
      table.integer('mairie_id')
      // Pas de foreign key — intégrité référentielle non garantie
      // Pas d'index sur mairie_id — queries lentes
      table.string('created_at')
      table.string('updated_at') // string pas timestamp — bug de tri potentiel
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('signalements')
    .dropTableIfExists('mairies')
}
