const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/', urlRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
