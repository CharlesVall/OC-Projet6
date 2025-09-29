const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes')

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
