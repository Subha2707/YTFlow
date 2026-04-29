const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  generatedContent: { type: mongoose.Schema.Types.Mixed },  // ✅ allow calendar, ideas, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);