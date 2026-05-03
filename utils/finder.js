const finder = (Model, key, source = 'params', field = 'id') => {
  return async (req, res, next) => {
    try {
      const value = req[source][field]

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