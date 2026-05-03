const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { JWT_SECRET } = require('../utils/config')
const { User, Session } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(
    userForToken,
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  await Session.create({
    token,
    userId: user.id,
  });

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name
    })
})

router.delete('/logout', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      token: req.token,
    },
  });

  res.status(204).end();
});

module.exports = router