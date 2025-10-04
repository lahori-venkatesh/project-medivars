import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  MapPin, 
  Heart, 
  FileText, 
  ArrowRight, 
  Plus, 
  Check, 
  X,
  Building,
  Languages,
  Calendar,
  User,
  CreditCard,
  Video,
  MessageSquare,
  Mic,
  MapPin as LocationIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { specialties } from '../data/specialties';

interface OnboardingData {
  specialization: string;
  consultationTypes: ('video' | 'chat' | 'clinic' | 'audio')[];
  license: File | null;
  idProof: File | null;
  addressProof: File | null;
  profilePicture: File | null;
  experience: string;
  clinicName: string;
  clinicAddress: string;
  languages: string[];
  fees: {
    video: string;
    chat: string;
    clinic: string;
    audio: string;
  };
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
}

const STEPS = [
  'Basic Registration',
  'Verification',
  'Profile Setup',
  'Schedule',
  'Final Review'
];

const CONSULTATION_TYPES = [
  {
    id: 'video',
    name: 'Video Consultation',
    icon: Video,
    description: 'Connect with patients via video call'
  },
  {
    id: 'audio',
    name: 'Audio Consultation',
    icon: Mic,
    description: 'Voice-only consultations for privacy and convenience'
  },
  {
    id: 'chat',
    name: 'Chat Consultation',
    icon: MessageSquare,
    description: 'Text-based consultations'
  },
  {
    id: 'clinic',
    name: 'In-Clinic Visit',
    icon: LocationIcon,
    description: 'Face-to-face consultations at your clinic'
  }
] as const;

export function DoctorOnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    specialization: '',
    consultationTypes: [],
    license: null,
    idProof: null,
    addressProof: null,
    profilePicture: null,
    experience: '',
    clinicName: '',
    clinicAddress: '',
    languages: [],
    fees: {
      video: '',
      chat: '',
      clinic: '',
      audio: ''
    },
    availability: {
      days: [],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    }
  });

  const handleFileUpload = (field: keyof Pick<OnboardingData, 'license' | 'idProof' | 'addressProof' | 'profilePicture'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
        toast.success(`Step ${currentStep + 1} completed!`);
      } else {
        // Submit final data
        toast.success('Profile submitted for verification!');
        navigate('/doctor/dashboard');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specialization
              </label>
              <select
                value={data.specialization}
                onChange={(e) => setData({ ...data, specialization: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="">Select Specialization</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Consultation Types
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONSULTATION_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setData(prev => ({
                          ...prev,
                          consultationTypes: prev.consultationTypes.includes(type.id)
                            ? prev.consultationTypes.filter(t => t !== type.id)
                            : [...prev.consultationTypes, type.id]
                        }));
                      }}
                      className={`
                        p-4 border-2 rounded-lg text-left transition-colors
                        ${data.consultationTypes.includes(type.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
                          : 'border-gray-200 hover:border-blue-300'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Medical License</label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  onChange={handleFileUpload('license')}
                  className="hidden"
                  id="license"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="license"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <FileText className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {data.license ? data.license.name : 'Upload License'}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ID Proof</label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  onChange={handleFileUpload('idProof')}
                  className="hidden"
                  id="idProof"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="idProof"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <User className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {data.idProof ? data.idProof.name : 'Upload ID Proof'}
                  </span>
                </label>
              </div>
            </div>

            {data.consultationTypes.includes('clinic') && (
              <div>
                <label className="block text-sm font-medium mb-2">Clinic Address Proof</label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    onChange={handleFileUpload('addressProof')}
                    className="hidden"
                    id="addressProof"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="addressProof"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Building className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {data.addressProof ? data.addressProof.name : 'Upload Address Proof'}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Profile Picture</label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  onChange={handleFileUpload('profilePicture')}
                  className="hidden"
                  id="profilePicture"
                  accept="image/*"
                />
                <label
                  htmlFor="profilePicture"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {data.profilePicture ? data.profilePicture.name : 'Upload Profile Picture'}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Years of Experience</label>
              <input
                type="number"
                value={data.experience}
                onChange={(e) => setData({ ...data, experience: e.target.value })}
                className="w-full p-3 border rounded-lg"
                min="0"
                required
              />
            </div>

            {data.consultationTypes.includes('clinic') && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Clinic Name</label>
                  <input
                    type="text"
                    value={data.clinicName}
                    onChange={(e) => setData({ ...data, clinicName: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Clinic Address</label>
                  <textarea
                    value={data.clinicAddress}
                    onChange={(e) => setData({ ...data, clinicAddress: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    rows={3}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Languages Spoken</label>
              <div className="space-y-2">
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'].map(lang => (
                  <label key={lang} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.languages.includes(lang)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setData(prev => ({
                            ...prev,
                            languages: [...prev.languages, lang]
                          }));
                        } else {
                          setData(prev => ({
                            ...prev,
                            languages: prev.languages.filter(l => l !== lang)
                          }));
                        }
                      }}
                      className="mr-2"
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Consultation Fees</label>
              {data.consultationTypes.map(type => (
                <div key={type} className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1 capitalize">{type}</label>
                  <div className="flex items-center">
                    <span className="mr-2">₹</span>
                    <input
                      type="number"
                      value={data.fees[type]}
                      onChange={(e) => setData({
                        ...data,
                        fees: { ...data.fees, [type]: e.target.value }
                      })}
                      className="w-full p-3 border rounded-lg"
                      min="0"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Working Days</label>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.availability.days.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setData(prev => ({
                            ...prev,
                            availability: {
                              ...prev.availability,
                              days: [...prev.availability.days, day]
                            }
                          }));
                        } else {
                          setData(prev => ({
                            ...prev,
                            availability: {
                              ...prev.availability,
                              days: prev.availability.days.filter(d => d !== day)
                            }
                          }));
                        }
                      }}
                      className="mr-2"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={data.availability.hours.start}
                  onChange={(e) => setData({
                    ...data,
                    availability: {
                      ...data.availability,
                      hours: { ...data.availability.hours, start: e.target.value }
                    }
                  })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={data.availability.hours.end}
                  onChange={(e) => setData({
                    ...data,
                    availability: {
                      ...data.availability,
                      hours: { ...data.availability.hours, end: e.target.value }
                    }
                  })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                Your profile is ready for review. Our team will verify your credentials within 24-48 hours.
              </p>
            </div>

            <div className="border rounded-lg divide-y">
              <div className="p-4">
                <h3 className="font-medium">Specialization</h3>
                <p className="text-gray-600">{data.specialization}</p>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Consultation Types</h3>
                <p className="text-gray-600">{data.consultationTypes.join(', ')}</p>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Experience</h3>
                <p className="text-gray-600">{data.experience} years</p>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Languages</h3>
                <p className="text-gray-600">{data.languages.join(', ')}</p>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Working Days</h3>
                <p className="text-gray-600">{data.availability.days.join(', ')}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      index < currentStep
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((step) => (
              <span key={step} className="text-sm">{step}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {renderStep()}

            <div className="mt-8 flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Back
                </button>
              )}
              
              <button
                type="submit"
                className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {currentStep === STEPS.length - 1 ? 'Submit for Review' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}