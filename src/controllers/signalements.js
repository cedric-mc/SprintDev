const multer = require('multer')
const SignalementModel = require('../models/signalement')
const { HttpError } = require('../middleware/errorHandler')
const { sendConfirmation } = require('../services/email')

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    callback(null, allowedTypes.includes(file.mimetype))
  },
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

module.exports = { upload, list, getById, create, updateStatus, remove }