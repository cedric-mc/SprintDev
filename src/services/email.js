const nodemailer = require('nodemailer')
const db = require('../config/db')

const MAX_ATTEMPTS = 3

const createTransporter = () => {
  if (process.env.NODE_ENV === 'production' && (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS)) {
    throw new Error('SMTP configuration is incomplete')
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: Number(process.env.SMTP_PORT) || 1025,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })
}

const buildConfirmation = signalement => ({
  subject: `Votre signalement #${signalement.id} a été reçu`,
  text: [
    'Merci pour votre signalement.',
    `Référence : #${signalement.id}`,
    `Catégorie : ${signalement.categorie}`,
    `Résumé : ${signalement.description.trim().slice(0, 240)}`,
    'Statut : recu',
    `Suivi : ${process.env.TRACKING_URL || 'http://localhost:5173/signalements/' + signalement.id}`,
  ].join('\n'),
})

const queueConfirmation = async signalement => {
  const message = buildConfirmation(signalement)
  const now = new Date().toISOString()
  const [id] = await db('email_deliveries').insert({
    recipient: signalement.citoyen_email,
    subject: message.subject,
    text: message.text,
    status: 'pending',
    attempts: 0,
    next_attempt_at: now,
    created_at: now,
  })
  return id
}

const processPendingEmails = async () => {
  const pending = await db('email_deliveries')
    .whereIn('status', ['pending', 'retry'])
    .where('next_attempt_at', '<=', new Date().toISOString())
    .where('attempts', '<', MAX_ATTEMPTS)
    .orderBy('id')

  for (const delivery of pending) {
    try {
      await createTransporter().sendMail({
        from: process.env.SMTP_FROM || 'no-reply@urbanlink.fr',
        to: delivery.recipient,
        subject: delivery.subject,
        text: delivery.text,
      })
      await db('email_deliveries').where('id', delivery.id).update({
        status: 'sent',
        attempts: delivery.attempts + 1,
        sent_at: new Date().toISOString(),
        last_error: null,
      })
    } catch (error) {
      const attempts = delivery.attempts + 1
      await db('email_deliveries').where('id', delivery.id).update({
        status: attempts >= MAX_ATTEMPTS ? 'failed' : 'retry',
        attempts,
        last_error: error.message.slice(0, 500),
        next_attempt_at: new Date(Date.now() + attempts * 1000).toISOString(),
      })
      console.error('Email delivery failed', { deliveryId: delivery.id, attempts, error: error.message })
    }
  }
}

const sendConfirmation = async (email, signalementId, categorie, description) => {
  const deliveryId = await queueConfirmation({ id: signalementId, citoyen_email: email, categorie, description })
  void processPendingEmails().catch(error => {
    console.error('Email delivery processing failed', { deliveryId, error: error.message })
  })
  return deliveryId
}

module.exports = { sendConfirmation, queueConfirmation, processPendingEmails, buildConfirmation }