const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authHeader = req.get('authorization')

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'missing token' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const session = await Session.findOne({
      where: { token },
      include: User,
    });

    if (!session) {
      return res.status(401).json({ error: 'session expired' });
    }

    if (!session.user) {
      return res.status(401).json({ error: 'user not found for session' });
    }

    if (session.user.disabled) {
      return res.status(403).json({ error: 'user disabled' });
    }

    req.user = session.user;
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

module.exports = tokenExtractor