// Model signalement — créé mais jamais utilisé dans les routes
// Baptiste a tout mis dans les routes directement, manque de temps

const db = require('../config/db')

// Ces fonctions sont bien écrites mais ne sont appelées nulle part
const SignalementModel = {
  findAll: (page = 1, limit = 20) =>
    db('signalements')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit),

  findById: (id) =>
    db('signalements').where('id', id).first(),

  create: (data) =>
    db('signalements').insert(data).returning('id'),

  updateStatut: (id, statut) =>
    db('signalements').where('id', id).update({ statut, updated_at: new Date() }),
}

module.exports = SignalementModel
// NOTE : utiliser ce modèle dans les routes et supprimer la logique dupliquée
