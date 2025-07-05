const authService = require('../services/authService');

exports.register = (req, res) => {
  const { username, password } = req.body;
  try {
    const token = authService.register(username, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  try {
    const token = authService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
