import { Router } from 'express';
import { validationResult } from 'express-validator';
import { validateNewsletter } from '../middleware/validation.js';
import { sendNewsletterWelcome } from '../models/emailTemplates.js';
import { storage } from '../storage.ts';

export const newsletterRoutes = Router();

newsletterRoutes.post('/subscribe', validateNewsletter, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Check if already subscribed
    const existing = await storage.getNewsletterByEmail(email);
    if (existing) {
      return res.status(409).json({
        message: 'Email already subscribed to newsletter'
      });
    }

    // Subscribe to newsletter
    const subscription = await storage.createNewsletter({ email });

    // Note: Email functionality requires SMTP configuration
    console.log('Newsletter subscription:', email);
    
    // In production, uncomment this line after setting up SMTP:
    // await sendNewsletterWelcome(email);

    res.status(201).json({
      message: 'Successfully subscribed to newsletter',
      id: subscription.id
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      message: 'Failed to subscribe to newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

newsletterRoutes.delete('/unsubscribe', validateNewsletter, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    const subscription = await storage.getNewsletterByEmail(email);
    if (!subscription) {
      return res.status(404).json({
        message: 'Email not found in newsletter subscriptions'
      });
    }

    await storage.unsubscribeNewsletter(email);

    res.json({
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      message: 'Failed to unsubscribe from newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});
