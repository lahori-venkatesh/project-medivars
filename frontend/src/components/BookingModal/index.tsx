import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Video, MessageSquare, MapPin, Mic, Shield } from 'lucide-react';
import { Doctor, TimeSlot } from '../../types';
import { Calendar } from '../Calendar';
import { TimeSlotPicker } from './TimeSlotPicker';
import { PaymentStep } from './PaymentStep';
import { formatDate } from '../../utils/date';
import { toast } from 'sonner';

type ConsultationType = 'in-person' | 'video' | 'chat' | 'audio';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
  onBook: (slot: TimeSlot) => void;
}

export function BookingModal({ doctor, onClose, onBook }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [step, setStep] = useState<'type' | 'slot' | 'payment'>('type');
  const [consultationType, setConsultationType] = useState<ConsultationType>('in-person');
  const [insuranceDetails, setInsuranceDetails] = useState({
    provider: '',
    policyNumber: '',
    holderName: ''
  });

  // Get unique available dates
  const availableDates = Array.from(
    new Set(doctor.availableSlots.map(slot => slot.date))
  );

  // Filter slots for selected date
  const availableSlots = doctor.availableSlots.filter(
    slot => formatDate(slot.date) === formatDate(selectedDate) && !slot.isBooked
  );

  const handlePaymentSuccess = (paymentId: string) => {
    if (selectedSlot) {
      try {
        onBook(selectedSlot);
        // Send confirmation notifications
        sendConfirmations();
        toast.success('Appointment booked successfully!');
        onClose();
      } catch (error) {
        toast.error('Failed to book appointment. Please try again.');
      }
    }
  };

  const sendConfirmations = () => {
    // Simulate sending confirmations
    toast.success('Confirmation sent via SMS');
    toast.success('Confirmation sent via Email');
    toast.success('Confirmation sent via WhatsApp');
  };

  const getFees = () => {
    let fee = doctor.consultationFee || 0;
    
    // Apply consultation type adjustments
    if (consultationType === 'video') fee *= 0.9; // 10% off for video
    if (consultationType === 'chat') fee *= 0.8; // 20% off for chat
    if (consultationType === 'audio') fee *= 0.85; // 15% off for audio
    
    // Apply first-time user discount
    if (isFirstTimeUser()) fee *= 0.8; // 20% off for first-time users
    
    // Apply insurance discount if applicable
    if (insuranceDetails.provider) fee *= 0.7; // 30% insurance coverage
    
    return fee;
  };

  const isFirstTimeUser = () => {
    // Simulate first-time user check
    return true;
  };

  const renderConsultationTypes = () => (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Select Consultation Type</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setConsultationType('in-person')}
          className={`p-4 md:p-6 rounded-lg border-2 text-left transition-colors ${
            consultationType === 'in-person'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2 md:mb-4" />
          <h3 className="font-semibold mb-1 md:mb-2">In-Person Visit</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Visit the clinic for a face-to-face consultation
          </p>
          {doctor.location && (
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
              {doctor.location.address}
            </p>
          )}
        </button>

        <button
          onClick={() => setConsultationType('video')}
          className={`p-4 md:p-6 rounded-lg border-2 text-left transition-colors ${
            consultationType === 'video'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Video className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2 md:mb-4" />
          <h3 className="font-semibold mb-1 md:mb-2">Video Consultation</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Connect with doctor via secure video call
          </p>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-green-600">10% off regular fee</p>
        </button>

        <button
          onClick={() => setConsultationType('audio')}
          className={`p-4 md:p-6 rounded-lg border-2 text-left transition-colors ${
            consultationType === 'audio'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Mic className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2 md:mb-4" />
          <h3 className="font-semibold mb-1 md:mb-2">Audio Consultation</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Voice-only consultation for privacy and convenience
          </p>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-green-600">15% off regular fee</p>
        </button>

        <button
          onClick={() => setConsultationType('chat')}
          className={`p-4 md:p-6 rounded-lg border-2 text-left transition-colors ${
            consultationType === 'chat'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2 md:mb-4" />
          <h3 className="font-semibold mb-1 md:mb-2">Chat Consultation</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Text chat with doctor at your convenience
          </p>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-green-600">20% off regular fee</p>
        </button>
      </div>

      {isFirstTimeUser() && (
        <div className="mt-4 p-3 md:p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
          <p className="text-xs md:text-sm text-green-800 dark:text-green-200">
            🎉 First-time user offer: Get 20% off on your first consultation!
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-3 md:p-4 border-b flex items-center justify-between">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-1 md:p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center mb-3 md:mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-3 md:mr-4"
              />
              <div>
                <h3 className="font-medium text-base md:text-lg">{doctor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  Base fee: ₹{doctor.consultationFee}
                </p>
              </div>
            </div>
          </div>

          {step === 'type' && renderConsultationTypes()}

          {step === 'slot' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 md:mb-4 flex items-center">
                    <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Select Date
                  </h4>
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    availableDates={availableDates}
                  />
                </div>

                <TimeSlotPicker
                  availableSlots={availableSlots}
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                />
              </div>

              {/* Insurance Details */}
              <div className="mt-5 md:mt-6 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center mb-3 md:mb-4">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2" />
                  <h4 className="text-sm md:text-base font-medium">Insurance Details (Optional)</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <input
                    type="text"
                    placeholder="Insurance Provider"
                    value={insuranceDetails.provider}
                    onChange={(e) => setInsuranceDetails({
                      ...insuranceDetails,
                      provider: e.target.value
                    })}
                    className="px-3 py-2 text-sm border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Policy Number"
                    value={insuranceDetails.policyNumber}
                    onChange={(e) => setInsuranceDetails({
                      ...insuranceDetails,
                      policyNumber: e.target.value
                    })}
                    className="px-3 py-2 text-sm border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Policy Holder Name"
                    value={insuranceDetails.holderName}
                    onChange={(e) => setInsuranceDetails({
                      ...insuranceDetails,
                      holderName: e.target.value
                    })}
                    className="px-3 py-2 text-sm border rounded-md"
                  />
                </div>
              </div>
            </>
          )}

          {step === 'payment' && (
            <PaymentStep
              amount={getFees()}
              insuranceDetails={insuranceDetails}
              onSuccess={handlePaymentSuccess}
              onBack={() => setStep('slot')}
            />
          )}

          <div className="mt-5 md:mt-6 flex justify-between">
            <button
              onClick={() => {
                if (step === 'payment') setStep('slot');
                else if (step === 'slot') setStep('type');
              }}
              className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (step === 'type') setStep('slot');
                else if (step === 'slot' && selectedSlot) setStep('payment');
              }}
              disabled={step === 'slot' && !selectedSlot}
              className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {step === 'type' ? 'Select Time Slot' : 'Continue to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}