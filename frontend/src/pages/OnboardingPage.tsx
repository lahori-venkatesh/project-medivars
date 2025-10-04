import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Heart, FileText, ArrowRight, Plus, Check, X } from 'lucide-react';
import { updateUser } from '../utils/auth';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  healthInterests: string[];
  medicalHistory?: File[];
}

const healthInterestOptions = [
  'Diabetes',
  'Heart Disease',
  'Hypertension',
  'Asthma',
  'Arthritis',
  'Skin Issues',
  'Mental Health',
  'Weight Management',
  'Women\'s Health',
  'Men\'s Health',
  'Child Health',
  'Elder Care'
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    gender: 'male',
    phone: '',
    email: '',
    address: '',
    healthInterests: [],
    medicalHistory: []
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProfile(prev => ({
      ...prev,
      medicalHistory: [...(prev.medicalHistory || []), ...files]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update user profile
      await updateUser({
        ...profile,
        onboardingCompleted: true
      });
      
      toast.success('Profile setup completed!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8">Basic Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                {['male', 'female', 'other'].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={profile.gender === gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'male' | 'female' | 'other' })}
                      className="mr-2"
                    />
                    <span className="capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8">Contact Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                We'll use this for appointment notifications and reminders
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                This helps us suggest nearby doctors
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8">Health Interests</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {healthInterestOptions.map((interest) => (
                <label
                  key={interest}
                  className={`
                    flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                    ${profile.healthInterests.includes(interest)
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={profile.healthInterests.includes(interest)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProfile({
                          ...profile,
                          healthInterests: [...profile.healthInterests, interest]
                        });
                      } else {
                        setProfile({
                          ...profile,
                          healthInterests: profile.healthInterests.filter(i => i !== interest)
                        });
                      }
                    }}
                    className="hidden"
                  />
                  <Heart
                    className={`w-5 h-5 mr-2 ${
                      profile.healthInterests.includes(interest)
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className="text-sm">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8">Medical History</h2>
            
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Upload medical records
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG up to 10MB each
                </span>
              </label>
            </div>

            {profile.medicalHistory && profile.medicalHistory.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Uploaded Files:</h3>
                <ul className="space-y-2">
                  {profile.medicalHistory.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setProfile({
                            ...profile,
                            medicalHistory: profile.medicalHistory?.filter((_, i) => i !== index)
                          });
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    stepNumber <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {stepNumber < step ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      stepNumber < step
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm">Basic Info</span>
            <span className="text-sm">Contact</span>
            <span className="text-sm">Interests</span>
            <span className="text-sm">History</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Back
                </button>
              )}
              
              <button
                type={step === 4 ? 'submit' : 'button'}
                onClick={() => step < 4 && setStep(step + 1)}
                className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {step === 4 ? 'Complete Setup' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}