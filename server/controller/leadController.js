// controllers/leadController.js
const Lead = require('../models/Lead');
const axios = require('axios'); // Make sure you have axios installed: npm install axios

// Replace this with your actual n8n Webhook URL later
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://odd-parts-worry.loca.lt/webhook-test/portfolio-lead';

exports.submitContactForm = async (req, res) => {
  try {
    // 1. On récupère EXACTEMENT ce que le React envoie (name, email, company, message)
    const { name, email, company, message } = req.body;

    // 2. On sauvegarde dans MongoDB
    const newLead = new Lead({
      senderName: name,         
      senderEmail: email,       
      originalMessage: message, 
      company: company,         
      aiClassification: 'Pending',
    });

    const savedLead = await newLead.save();

    // 3. On envoie au webhook n8n
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://odd-parts-worry.loca.lt/webhook-test/portfolio-lead';
    
    try {
      await axios.post(N8N_WEBHOOK_URL, {
        leadId: savedLead._id,
        senderName: name,        // On utilise bien 'name' ici aussi
        senderEmail: email,      // On utilise bien 'email'
        originalMessage: message // On utilise bien 'message'
      });
      console.log('✅ Webhook sent to n8n successfully.');
    } catch (webhookError) {
      console.error('⚠️ Failed to send webhook to n8n:', webhookError.message);
    }

    // 4. On répond au Frontend que c'est un succès
    res.status(201).json({ 
      success: true, 
      message: 'Message received!',
      leadId: savedLead._id 
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

