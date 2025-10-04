import React, { useState } from 'react';
import { X, Phone, Clock, User, Building, Stethoscope } from 'lucide-react';
import { specialties } from '../data/specialties';
import { toast } from 'sonner';

interface BookCallModalProps {
  onClose: () => void;
}

export function BookCallModal({ onClose }: BookCallModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    specialty: '',
    hospital: '',
    urgency: 'normal'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Call request submitted successfully!');
      toast.success('A doctor will call you within 5 minutes');
      
      onClose();
    } catch (error) {
      toast.error('Failed to submit call request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-3 md:p-4 border-b flex items-center justify-between">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">Book a Call</h2>
          <button
            onClick={onClose}
            className="p-1 md:p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Get connected with an available doctor in your selected specialty. You'll receive a call within <span className="font-semibold">5 minutes</span>.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Specialty Required
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select a specialty</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hospital/Clinic (Optional)
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter hospital or clinic name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Urgency
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className={`flex items-center justify-center p-2 border rounded-md cursor-pointer ${
                  formData.urgency === 'low' 
                    ? 'bg-green-50 border-green-500 dark:bg-green-900/30 dark:border-green-600' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="urgency"
                    value="low"
                    checked={formData.urgency === 'low'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm">Low</span>
                </label>
                <label className={`flex items-center justify-center p-2 border rounded-md cursor-pointer ${
                  formData.urgency === 'normal' 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="urgency"
                    value="normal"
                    checked={formData.urgency === 'normal'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm">Normal</span>
                </label>
                <label className={`flex items-center justify-center p-2 border rounded-md cursor-pointer ${
                  formData.urgency === 'high' 
                    ? 'bg-red-50 border-red-500 dark:bg-red-900/30 dark:border-red-600' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="urgency"
                    value="high"
                    checked={formData.urgency === 'high'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm">High</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    Request Call Back
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                You'll receive a call from a doctor within 5 minutes
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}