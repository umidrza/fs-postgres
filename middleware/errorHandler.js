const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: err.errors.map(e => e.message)
    })
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      error: err.message
    })
  }

  res.status(500).json({
    error: 'Internal server error'
  })
}

module.exports = errorHandler