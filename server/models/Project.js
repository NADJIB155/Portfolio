const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }], // e.g., ['React', 'Node', 'JWT', 'n8n', 'Telegram API']
  githubLink: { type: String },
  liveLink: { type: String },
  category: { type: String }, // e.g., 'Web Dev', 'Automation', 'Data Analysis'
  
  // NEW: The AI Context for the RAG Assistant
  ragContext: {
    architecture: { type: String, default: "" },      // "Used MVC pattern with Express..."
    challengesSolved: { type: String, default: "" },  // "Handled JWT token expiration by..."
    features: { type: String, default: "" }           // "Automated QCM creation, real-time sync..."
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);