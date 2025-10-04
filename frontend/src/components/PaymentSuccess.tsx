import React, { useEffect } from 'react';
import { Check, Calendar } from 'lucide-react';

interface PaymentSuccessProps {
  amount: number;
  onClose: () => void;
}

export function PaymentSuccess({ amount, onClose }: PaymentSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 relative animate-slideIn">
        <div className="flex flex-col items-center">
          {/* Success checkmark animation */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-scaleIn">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 animate-fadeIn">
            Payment Successful!
          </h2>
          
          <p className="text-gray-600 mb-4 animate-fadeIn">
            Amount paid: ₹{amount}
          </p>
          
          <div className="w-full bg-green-50 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
            <Calendar className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">
              Your appointment has been confirmed. Check your email for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}