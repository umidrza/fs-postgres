const router = require('express').Router()
const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models')
const userService = require('../services/userService')
const tokenExtractor = require('../middleware/tokenExtractor')
const isAdmin = require('../middleware/isAdmin')

router.get('/', asyncHandler(async (req, res) => {
  const users = await userService.getAll()
  res.json(users)
}))

router.post('/', asyncHandler(async (req, res) => {
  const user = await userService.create(req.body)
  res.json(user)
}))

router.get('/:username', asyncHandler(async (req, res) => {
  const user = await userService.getByUsername(req.params.username)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  res.json(user)
}))

router.put('/:username', asyncHandler(async (req, res) => {
  const user = await userService.getByUsername(req.params.username)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  const updatedUser = await userService.update(user, req.body)
  res.json(updatedUser)
}))

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await userService.getByUsername(req.params.username)

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).json({ error: 'user not found' })
  }
})

module.exports = router