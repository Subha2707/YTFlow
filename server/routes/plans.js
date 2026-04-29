const express = require('express');
const auth = require('../middleware/auth');
const Plan = require('../models/Plan');
const router = express.Router();

// Save a new plan
router.post('/', auth, async (req, res) => {
  try {
    const { topic, generatedContent } = req.body;
    const plan = await Plan.create({
      userId: req.userId,
      topic,
      generatedContent
    });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save plan' });
  }
});

// Get all plans for logged-in user (sorted newest first)
router.get('/', auth, async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

module.exports = router;