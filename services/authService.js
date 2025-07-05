const users = require('../storage/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_EXPIRY } = require('../config/config');

exports.register = (username, password) => {
  if (users[username]) throw new Error('User already exists');
  users[username] = { password };
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

exports.login = (username, password) => {
  const user = users[username];
  if (!user || user.password !== password) throw new Error('Invalid credentials');
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};
