require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

// Init Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
