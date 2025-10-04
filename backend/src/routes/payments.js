import express from 'express';
import Stripe from 'stripe';
import { authenticate } from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-intent', authenticate, async (req, res) => {
  try {
    const { appointmentId } = req.body;
    
    const appointment = await Appointment.findById(appointmentId)
      .populate('doctor', 'firstName lastName consultationFee');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointment.payment.amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        appointmentId: appointment._id.toString(),
        patientId: req.user._id.toString()
      }
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Confirm payment
router.post('/confirm', authenticate, async (req, res) => {
  try {
    const { paymentIntentId, appointmentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      await Appointment.findByIdAndUpdate(appointmentId, {
        'payment.status': 'completed',
        'payment.paymentId': paymentIntentId,
        'payment.paymentMethod': paymentIntent.payment_method_types[0]
      });
      
      res.json({ success: true, message: 'Payment confirmed' });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;