const multer = require('multer')
const SignalementModel = require('../models/signalement')
const { HttpError } = require('../middleware/errorHandler')
const { sendConfirmation, sendStatusChange } = require('../services/email')

const STATUTS = ['recu', 'en_cours', 'resolu']
const CATEGORIES = ['Voirie', 'Éclairage', 'Propreté', 'Espaces verts', 'Mobilier urbain']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  if (typeof categorie !== 'string' || !CATEGORIES.includes(categorie)) {
    errors.push('La catégorie est inconnue')
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

const uploadPhoto = (req, res, next) => upload.single('photo')(req, res, error => {
  if (error) return next(error instanceof HttpError ? error : new HttpError(400, 'Photo invalide ou trop volumineuse'))
  next()
})

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
  const errors = {}
  const numericLatitude = Number(latitude)
  const numericLongitude = Number(longitude)
  const numericMairieId = Number(mairie_id)

  if (!titre || titre.trim().length < 3) errors.titre = 'Le titre doit contenir au moins 3 caractères'
  if (!description || description.trim().length < 10) errors.description = 'La description doit contenir au moins 10 caractères'
  if (!CATEGORIES.includes(categorie)) errors.categorie = 'Catégorie inconnue'
  if (!EMAIL_PATTERN.test(citoyen_email || '')) errors.citoyen_email = 'Adresse email invalide'
  if (!Number.isFinite(numericLatitude) || numericLatitude < -90 || numericLatitude > 90) errors.latitude = 'Latitude invalide'
  if (!Number.isFinite(numericLongitude) || numericLongitude < -180 || numericLongitude > 180) errors.longitude = 'Longitude invalide'
  if (!Number.isInteger(numericMairieId) || numericMairieId < 1) errors.mairie_id = 'Mairie invalide'
  if (Object.keys(errors).length) throw new HttpError(400, 'Données invalides', errors)

  const [created] = await SignalementModel.create({
    titre,
    description,
    categorie,
    latitude: numericLatitude,
    longitude: numericLongitude,
    mairie_id: numericMairieId,
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
  const { statut } = req.body
  if (!STATUTS.includes(statut)) throw new HttpError(400, 'Statut invalide')
  if (!req.user.mairie_id || !req.user.id) throw new HttpError(403, 'Agent non rattaché à une mairie')

  const updated = await SignalementModel.updateStatut(
    req.params.id,
    statut,
    req.user.id,
    req.user.mairie_id,
  )
  if (!updated) {
    const exists = await SignalementModel.findById(req.params.id)
    if (!exists) throw new HttpError(404, 'Not found')
    throw new HttpError(403, 'Accès interdit')
  }

  let notification = 'envoyee'
  try {
    if (updated.citoyen_email) await sendStatusChange(updated.citoyen_email, updated.id, statut)
  } catch (error) {
    notification = 'echec'
    console.error('Status email failed:', error.message)
  }
  res.json({ success: true, statut, notification })
}

const remove = async (req, res) => {
  await SignalementModel.remove(req.params.id)
  res.json({ success: true })
}

module.exports = { upload, uploadPhoto, validateCreation, list, getById, create, updateStatus, remove }
