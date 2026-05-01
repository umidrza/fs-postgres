const finder = (Model, key = 'item') => {
  return async (req, res, next) => {
    try {
      const instance = await Model.findByPk(req.params.id)

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