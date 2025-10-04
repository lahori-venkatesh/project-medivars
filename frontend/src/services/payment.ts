import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

const stripePromise = loadStripe('your_publishable_key');

export async function processPayment(appointmentId: string, amount: number) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    // In a real app, you would create a payment intent on your backend
    const paymentIntent = {
      id: 'mock_payment_' + Date.now(),
      amount,
      status: 'succeeded'
    };

    toast.success('Payment processed successfully');
    return paymentIntent;
  } catch (error) {
    console.error('Payment processing error:', error);
    toast.error('Payment failed. Please try again.');
    throw error;
  }
}

export function getPaymentMethods(userId: string) {
  // Simulate fetching saved payment methods
  return [
    {
      id: '1',
      type: 'card',
      details: {
        brand: 'visa',
        last4: '4242'
      },
      isDefault: true
    },
    {
      id: '2',
      type: 'upi',
      details: {
        id: 'user@upi'
      }
    },
    {
      id: '3',
      type: 'netbanking',
      details: {
        bankName: 'HDFC Bank'
      }
    }
  ];
}