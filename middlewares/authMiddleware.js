const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token missing' });

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};
