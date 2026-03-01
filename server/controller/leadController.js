// controllers/leadController.js
const Lead = require('../models/Lead');
const axios = require('axios'); // Make sure you have axios installed: npm install axios

// Replace this with your actual n8n Webhook URL later
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/portfolio-lead';

exports.submitContactForm = async (req, res) => {
  try {
    const { senderName, senderEmail, originalMessage } = req.body;

    // 1. Save the raw message to MongoDB immediately
    const newLead = new Lead({
      senderName,
      senderEmail,
      originalMessage,
      aiClassification: 'Pending', // It hasn't been processed by AI yet
    });

    const savedLead = await newLead.save();

    // 2. Send the data to your n8n workflow for AI processing
    // We do this asynchronously so the user doesn't have to wait for the AI
    try {
      await axios.post(N8N_WEBHOOK_URL, {
        leadId: savedLead._id,
        senderName,
        senderEmail,
        originalMessage
      });
      console.log('Webhook sent to n8n successfully.');
    } catch (webhookError) {
      console.error('Failed to send webhook to n8n:', webhookError.message);
      // We don't fail the whole request if the webhook fails, the lead is still saved.
    }

    // 3. Respond to the React frontend immediately
    res.status(201).json({ 
      success: true, 
      message: 'Message received! AI is reviewing it and notifying Nadjib.',
      leadId: savedLead._id 
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


