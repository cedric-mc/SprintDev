const nodemailer = require('nodemailer')

const sendConfirmation = async (email, signalementId) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter.sendMail({
    from: 'no-reply@urbanlink.fr',
    to: email,
    subject: `Votre signalement #${signalementId} a été reçu`,
    text: `Merci pour votre signalement. Référence : #${signalementId}`,
  })
}

module.exports = { sendConfirmation }