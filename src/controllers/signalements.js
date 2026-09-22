const multer = require('multer')
const SignalementModel = require('../models/signalement')
const { HttpError } = require('../middleware/errorHandler')
const { sendConfirmation } = require('../services/email')

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new HttpError(400, 'Le fichier doit être une image JPEG, PNG ou WebP')
      return callback(error)
    }
    callback(null, true)
  },
})

const validateCreation = async (req, res, next) => {
  const { titre, description, categorie, latitude, longitude, mairie_id, citoyen_email } = req.body
  const errors = []
  const parsedLatitude = Number(latitude)
  const parsedLongitude = Number(longitude)
  const parsedMairieId = Number(mairie_id)

  if (typeof titre !== 'string' || titre.trim().length < 3 || titre.trim().length > 120) {
    errors.push('Le titre doit contenir entre 3 et 120 caractères')
  }
  if (typeof description !== 'string' || description.trim().length < 10 || description.trim().length > 2000) {
    errors.push('La description doit contenir entre 10 et 2000 caractères')
  }
  if (typeof categorie !== 'string' || !categorie.trim() || categorie.trim().length > 80) {
    errors.push('La catégorie est obligatoire et ne doit pas dépasser 80 caractères')
  }
  if (!Number.isFinite(parsedLatitude) || parsedLatitude < -90 || parsedLatitude > 90) {
    errors.push('La latitude doit être comprise entre -90 et 90')
  }
  if (!Number.isFinite(parsedLongitude) || parsedLongitude < -180 || parsedLongitude > 180) {
    errors.push('La longitude doit être comprise entre -180 et 180')
  }
  if (!Number.isInteger(parsedMairieId) || parsedMairieId < 1) {
    errors.push('La mairie est obligatoire')
  } else if (!await SignalementModel.mairieExists(parsedMairieId)) {
    errors.push('La mairie sélectionnée n’existe pas')
  }
  if (typeof citoyen_email !== 'string' || !/^\S+@\S+\.\S+$/.test(citoyen_email)) {
    errors.push('Une adresse email valide est obligatoire')
  }

  if (errors.length) {
    const error = new HttpError(400, 'Les données du signalement sont invalides')
    error.details = errors
    return next(error)
  }
  next()
}

const list = async (req, res) => {
  res.json(await SignalementModel.findAll())
}

const getById = async (req, res) => {
  const signalement = await SignalementModel.findById(req.params.id)
  if (!signalement) throw new HttpError(404, 'Not found')
  res.json(signalement)
}

const create = async (req, res) => {
  const { titre, description, categorie, latitude, longitude, mairie_id, citoyen_email } = req.body
  const [created] = await SignalementModel.create({
    titre,
    description,
    categorie,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    mairie_id: parseInt(mairie_id),
    citoyen_email,
    photo_path: req.file ? req.file.path : null,
    statut: 'recu',
    created_at: new Date().toISOString(),
  })

  const id = typeof created === 'object' ? created.id : created

  sendConfirmation(citoyen_email, id).catch(error => {
    console.error('Email confirmation failed:', error.message)
  })

  res.status(201).json({ id, message: 'Signalement créé' })
}

const updateStatus = async (req, res) => {
  await SignalementModel.updateStatut(req.params.id, req.body.statut)
  res.json({ success: true })
}

const remove = async (req, res) => {
  await SignalementModel.remove(req.params.id)
  res.json({ success: true })
}

module.exports = { upload, validateCreation, list, getById, create, updateStatus, remove }