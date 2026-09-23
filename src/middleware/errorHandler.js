class HttpError extends Error {
  constructor (status, message) {
    super(message)
    this.status = status
    this.details = arguments[2]
  }
}

const errorHandler = (err, req, res, next) => {
  void next
  if (!err.status || err.status >= 500) console.error(err)

  const status = err.status || 500
  const message = status >= 500 && process.env.NODE_ENV === 'production'
    ? 'Une erreur interne est survenue'
    : err.message

  const response = { error: message }
  if (err.details) {
    response.details = err.details
    response.fields = err.details
  }
  res.status(status).json(response)
}

module.exports = { HttpError, errorHandler }