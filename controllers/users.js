const router = require('express').Router()
const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models')
const userService = require('../services/userService')

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

module.exports = router