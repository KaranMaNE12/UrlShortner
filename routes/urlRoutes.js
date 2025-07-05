const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
// Pages
router.get('/', (req, res) => res.sendFile('index.html', { root: './public' }));

// API
router.post('/shorten', urlController.shortenUrl);
router.get('/:code', urlController.redirectUrl);

module.exports = router;