import React, { useState } from 'react';
import { processPayment } from '../../services/payment';

interface PaymentStepProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onBack: () => void;
}

export function PaymentStep({ amount, onSuccess, onBack }: PaymentStepProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await processPayment('appointment_id', amount);
      onSuccess(result.id);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm text-gray-600">Consultation Fee</p>
        <p className="text-2xl font-semibold">₹{amount}</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        
        <button
          onClick={onBack}
          className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100"
        >
          Back to Slot Selection
        </button>
      </div>
    </div>
  );
}