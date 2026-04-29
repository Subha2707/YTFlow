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

// Get single plan
router.get('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, userId: req.userId });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
});

// Delete a plan
router.delete('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});

module.exports = router;