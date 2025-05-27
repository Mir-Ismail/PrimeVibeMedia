import { Router } from 'express';
import { validationResult } from 'express-validator';
import { validateContact } from '../middleware/validation.js';
import { sendContactEmail, sendAutoReply } from '../models/emailTemplates.js';
import { storage } from '../storage.ts';

export const contactRoutes = Router();

contactRoutes.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, company, message } = req.body;

    // Save contact to storage
    const contact = await storage.createContact({
      name,
      email,
      company,
      message
    });

    // Note: Email functionality requires SMTP configuration
    // For now, we'll just log the contact submission
    console.log('Contact form submitted:', { name, email, company, message });
    
    // In production, uncomment these lines after setting up SMTP:
    // await sendContactEmail({ name, email, company, message });
    // await sendAutoReply(email, name);

    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: contact.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      message: 'Failed to process contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});
