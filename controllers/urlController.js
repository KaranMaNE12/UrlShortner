const urlService = require('../services/urlService');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

exports.shortenUrl = (req, res) => {
  const { originalUrl, customCode } = req.body;

  let username = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, JWT_SECRET);
      username = payload.username;
    } catch (_) {}
  }

  try {
    const shortUrl = urlService.createShortUrl(originalUrl, customCode, username, req);
    res.json({ shortUrl });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.redirectUrl = (req, res) => {
  const { code } = req.params;
  const url = urlService.getOriginalUrl(code);
  if (url) return res.redirect(url);
  return res.status(404).send('URL not found');
};
