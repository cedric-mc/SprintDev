// Model signalement — créé mais jamais utilisé dans les routes
// Baptiste a tout mis dans les routes directement, manque de temps

const db = require('../config/db')

// Ces fonctions sont bien écrites mais ne sont appelées nulle part
const SignalementModel = {
  findAll: ({ categorie, statut, page = 1, limit = 20 } = {}) => {
    const baseQuery = db('signalements as s')
      .leftJoin('mairies as m', 'm.id', 's.mairie_id')
      .select(
        's.id', 's.titre', 's.description', 's.categorie', 's.latitude', 's.longitude',
        's.statut', 's.photo_path', 's.mairie_id', 's.created_at', 's.updated_at',
        'm.id as mairie_ref_id',
        'm.nom as mairie_nom',
        'm.ville as mairie_ville',
        'm.code_postal as mairie_code_postal',
        'm.email as mairie_email',
      )
      .modify(query => {
        if (categorie) query.where('s.categorie', categorie)
        if (statut) query.where('s.statut', statut)
      })

    const countQuery = db('signalements as s')
      .count('s.id as total')
      .modify(query => {
        if (categorie) query.where('s.categorie', categorie)
        if (statut) query.where('s.statut', statut)
      })

    return Promise.all([
      baseQuery.clone().orderBy('s.created_at', 'desc').orderBy('s.id', 'desc').limit(limit).offset((page - 1) * limit),
      countQuery,
    ]).then(([rows, countRows]) => ({
      data: rows.map(({ mairie_ref_id, mairie_nom, mairie_ville, mairie_code_postal, mairie_email, ...signalement }) => ({
        ...signalement,
        mairie: mairie_ref_id
          ? { id: mairie_ref_id, nom: mairie_nom, ville: mairie_ville, code_postal: mairie_code_postal, email: mairie_email }
          : null,
      })),
      pagination: {
        page,
        limit,
        total: Number(countRows[0].total),
        totalPages: Math.ceil(Number(countRows[0].total) / limit),
      },
    }))
  },

  findById: (id) =>
    db('signalements').where('id', id).select(
      'id', 'titre', 'description', 'categorie', 'latitude', 'longitude',
      'statut', 'photo_path', 'mairie_id', 'created_at', 'updated_at',
    ).first(),

  mairieExists: id =>
    db('mairies').where('id', id).first().then(Boolean),

  create: (data) =>
    db('signalements').insert(data).returning('id'),

  updateStatut: async (id, statut, agentId, mairieId) => db.transaction(async trx => {
    const signalement = await trx('signalements').where({ id }).first()
    if (!signalement) return null
    if (String(signalement.mairie_id) !== String(mairieId)) return false

    const updated = await trx('signalements')
      .where({ id, statut: signalement.statut })
      .update({ statut, updated_at: new Date().toISOString() })
    if (updated !== 1) return false

    await trx('statut_historique').insert({
      signalement_id: id,
      ancien_statut: signalement.statut,
      nouveau_statut: statut,
      agent_id: agentId,
      created_at: new Date().toISOString(),
    })
    return { ...signalement, statut }
  }),

  remove: id =>
    db('signalements').where('id', id).delete(),
}

module.exports = SignalementModel
// NOTE : utiliser ce modèle dans les routes et supprimer la logique dupliquée
