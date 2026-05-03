const finder = (Model, key, source = 'params', field = 'id') => {
  return async (req, res, next) => {
    try {
      const value = req[source][field]

      if (!value) {
        return res.status(400).json({ error: `${field} is required` })
      }

      const instance = await Model.findByPk(value)

      if (!instance) {
        return res.status(404).json({ error: `${key} not found` })
      }

      req[key] = instance
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = finder