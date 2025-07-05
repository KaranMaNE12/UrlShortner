const urls = require('../storage/urls');
const generateShortCode = require('../utils/generateShortCode');

exports.createShortUrl = (originalUrl, customCode, username, req) => {
  if (!originalUrl || !originalUrl.startsWith('http')) throw new Error('Invalid URL');

  let code = customCode;
  if (code) {
    if (!username) throw new Error('Login required for custom URLs');
    if (urls[code]) throw new Error('Custom code already exists');
  } else {
    code = generateShortCode();
  }

  urls[code] = { originalUrl, user: username };
  return `${req.protocol}://${req.get('host')}/${code}`;
};

exports.getOriginalUrl = (code) => {
  return urls[code]?.originalUrl || null;
};
