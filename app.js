const express = require('express');
const cors = require('cors');
const path = require("path");
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes)

module.exports = app;
