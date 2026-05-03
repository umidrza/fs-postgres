const authorizeBlogOwner = (req, res, next) => {
  if (req.blog.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden: not the owner' })
  }
  next()
}

module.exports = authorizeBlogOwner