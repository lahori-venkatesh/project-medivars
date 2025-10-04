import React, { useState } from 'react';
import { processPayment, getPaymentMethods } from '../services/payment';
import { PaymentMethod } from '../types';

interface PaymentSectionProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: Error) => void;
}

export function PaymentSection({ amount, onSuccess, onError }: PaymentSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedMethods] = useState(getPaymentMethods('user_id'));

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setLoading(true);
    try {
      const result = await processPayment('appointment_id', amount);
      onSuccess(result.id);
    } catch (error) {
      onError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Details</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm text-gray-600">Consultation Fee</p>
        <p className="text-2xl font-semibold">₹{amount}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Saved Payment Methods</p>
        {savedMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method)}
            className={`w-full p-3 border rounded-md flex items-center justify-between ${
              selectedMethod?.id === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {method.type === 'card' ? `•••• ${method.details.last4}` : method.type}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedMethod || loading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}