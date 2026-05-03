const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Register attempt:', req.body.email);
    
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, username });
    
    console.log('User registered:', user._id);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Login successful:', email);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ email: user.email, username: user.username});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Temporary debug route - REMOVE AFTER TESTING
router.get('/debug', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    // Try a test operation
    const userCount = await User.countDocuments();
    
    res.json({
      mongoState: states[state],
      userCount,
      env: {
        hasJWTSecret: !!process.env.JWT_SECRET,
        hasMongoURI: !!process.env.MONGO_URI,
        mongoURI: process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + '...' : 'MISSING'
      }
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});


module.exports = router;