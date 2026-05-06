const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');
const crimeRoutes = require('./routes/crimeRoutes');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/crimes', crimeRoutes);

// Data Simulation for Lite Deployment (Production)
if (process.env.NODE_ENV === 'production' || process.env.SIMULATE === 'true') {
  const simulateData = require('./utils/dataSimulator');
  simulateData();
}

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CrimeLens India API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
