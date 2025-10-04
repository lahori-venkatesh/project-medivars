import React, { useState } from 'react';
import { processPayment } from '../services/payment';
import { PaymentSuccess } from './PaymentSuccess';
import { CreditCard, Smartphone, Building, Shield } from 'lucide-react';

interface PaymentStepProps {
  amount: number;
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    holderName: string;
  };
  onSuccess: (paymentId: string) => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Pay securely with your card'
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Google Pay, PhonePe, Paytm'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: <Building className="w-6 h-6" />,
    description: 'All major banks supported'
  },
  {
    id: 'wallet',
    name: 'Wallets',
    icon: <Shield className="w-6 h-6" />,
    description: 'Paytm, PhonePe, Amazon Pay'
  }
];

export function PaymentStep({ amount, insuranceDetails, onSuccess, onBack }: PaymentStepProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await processPayment('appointment_id', amount);
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess(result.id);
      }, 3000);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return <PaymentSuccess amount={amount} onClose={() => setShowSuccess(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span>Consultation Fee</span>
          <span>₹{amount}</span>
        </div>
        {insuranceDetails?.provider && (
          <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
            <span>Insurance Coverage</span>
            <span>-₹{amount * 0.3}</span>
          </div>
        )}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>₹{amount - (insuranceDetails?.provider ? amount * 0.3 : 0)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-medium">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedMethod(option.id)}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                selectedMethod === option.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <div>
                  <div className="font-medium">{option.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                placeholder="123"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name on Card</label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      )}

      {/* UPI Input */}
      {selectedMethod === 'upi' && (
        <div>
          <label className="block text-sm font-medium mb-1">UPI ID</label>
          <input
            type="text"
            placeholder="username@upi"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      )}

      {/* Net Banking Banks */}
      {selectedMethod === 'netbanking' && (
        <div className="grid grid-cols-2 gap-4">
          {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
            <button
              key={bank}
              className="p-3 border rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {bank}
            </button>
          ))}
        </div>
      )}

      {/* Wallet Options */}
      {selectedMethod === 'wallet' && (
        <div className="grid grid-cols-2 gap-4">
          {['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik'].map((wallet) => (
            <button
              key={wallet}
              className="p-3 border rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {wallet}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );
}