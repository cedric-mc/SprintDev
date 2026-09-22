// Model signalement — créé mais jamais utilisé dans les routes
// Baptiste a tout mis dans les routes directement, manque de temps

const db = require('../config/db')

// Ces fonctions sont bien écrites mais ne sont appelées nulle part
const SignalementModel = {
  findAll: () =>
    db('signalements as s')
      .leftJoin('mairies as m', 'm.id', 's.mairie_id')
      .select(
        's.*',
        'm.id as mairie_ref_id',
        'm.nom as mairie_nom',
        'm.ville as mairie_ville',
        'm.code_postal as mairie_code_postal',
        'm.email as mairie_email',
      )
      .orderBy('s.created_at', 'desc')
      .then(rows => rows.map(({ mairie_ref_id, mairie_nom, mairie_ville, mairie_code_postal, mairie_email, ...signalement }) => ({
        ...signalement,
        mairie: mairie_ref_id
          ? { id: mairie_ref_id, nom: mairie_nom, ville: mairie_ville, code_postal: mairie_code_postal, email: mairie_email }
          : null,
      }))),

  findById: (id) =>
    db('signalements').where('id', id).first(),

  mairieExists: id =>
    db('mairies').where('id', id).first().then(Boolean),

  create: (data) =>
    db('signalements').insert(data).returning('id'),

  updateStatut: (id, statut) =>
    db('signalements').where('id', id).update({ statut, updated_at: new Date() }),

  remove: id =>
    db('signalements').where('id', id).delete(),
}

module.exports = SignalementModel
// NOTE : utiliser ce modèle dans les routes et supprimer la logique dupliquée
