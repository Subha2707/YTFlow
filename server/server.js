require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const generateRoutes = require('./routes/generate');
const plansRoutes = require('./routes/plans');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// CORS - Allow all origins during debugging
app.use(cors());
app.use(express.json());

// MongoDB connection with retry
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Don't crash the server - let it run without DB
    console.log('Server will continue without database connection');
  }
};
connectDB();

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongoState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/analytics', analyticsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));