const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  originalMessage: { type: String, required: true },
  
  // NEW: AI-Generated Fields
  aiClassification: { 
    type: String, 
    enum: ['Job Opportunity', 'Freelance', 'Spam', 'Question', 'Pending'],
    default: 'Pending'
  },
  aiSummary: { type: String, default: "" },
  
  status: { type: String, enum: ['Unread', 'Read', 'Replied'], default: 'Unread' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);