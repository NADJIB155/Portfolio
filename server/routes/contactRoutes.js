// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controller/leadController');

// POST request from your React contact form
router.post('/submit', leadController.submitContactForm);

module.exports = router;