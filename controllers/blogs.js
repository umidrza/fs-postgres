const router = require('express').Router()
const asyncHandler = require('../middleware/asyncHandler')
const finder = require('../utils/finder')
const blogService = require('../services/blogService')
const { Blog, User } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

const blogFinder = finder(Blog, 'blog')

router.get('/', asyncHandler(async (req, res) => {
  const blogs = await blogService.getAll({ search: req.query.search })
  res.json(blogs)
}))

router.post('/', tokenExtractor, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await blogService.create({ ...req.body, userId: user.id })
  res.json(blog)
}))

const authorizeBlogOwner = (req, res, next) => {
  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'Forbidden: not the owner' })
  }
  next()
}

router.get('/:id', blogFinder, (req, res) => {
  res.json(req.blog)
})

router.put('/:id', tokenExtractor, blogFinder, authorizeBlogOwner, asyncHandler(async (req, res) => {
  const updated = await blogService.update(req.blog, req.body)
  res.json(updated)
}))

router.delete('/:id', tokenExtractor, blogFinder, authorizeBlogOwner, asyncHandler(async (req, res) => {
  await blogService.remove(req.blog)
  res.status(204).end()
}))

module.exports = router