import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Lock, Stethoscope, ArrowRight, Check, ToggleLeft as Google, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import { sendOTP, verifyOTP } from '../utils/otp';

export function DoctorSignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'method' | 'form' | 'otp'>('method');
  const [signupMethod, setSignupMethod] = useState<'phone' | 'email' | 'social' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  const handleMethodSelect = (method: 'phone' | 'email' | 'social') => {
    setSignupMethod(method);
    setStep('form');
  };

  const handleSocialSignup = async (provider: 'google' | 'linkedin') => {
    try {
      // Simulate social login
      toast.success(`Signed up with ${provider}`);
      navigate('/doctor/onboarding');
    } catch (error) {
      toast.error('Failed to sign up');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (step === 'form') {
        if (signupMethod === 'phone') {
          await sendOTP(formData.phone);
          setStep('otp');
          toast.success('OTP sent to your phone');
        } else {
          // Handle email signup
          navigate('/doctor/onboarding');
        }
      } else if (step === 'otp') {
        const isValid = await verifyOTP(formData.phone, formData.otp);
        if (isValid) {
          navigate('/doctor/onboarding');
        } else {
          toast.error('Invalid OTP');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join as a Doctor</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Start your journey with us and grow your practice
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {step === 'method' && (
            <div className="space-y-4">
              <button
                onClick={() => handleMethodSelect('phone')}
                className="w-full p-4 border-2 rounded-lg flex items-center gap-4 hover:border-blue-500 transition-colors"
              >
                <Phone className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-medium">Phone Number</h3>
                  <p className="text-sm text-gray-500">Verify with OTP (Recommended)</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect('email')}
                className="w-full p-4 border-2 rounded-lg flex items-center gap-4 hover:border-blue-500 transition-colors"
              >
                <Mail className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-medium">Email & Password</h3>
                  <p className="text-sm text-gray-500">Sign up with your email</p>
                </div>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSocialSignup('google')}
                  className="p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                  <Google className="w-5 h-5" />
                  <span>Google</span>
                </button>
                <button
                  onClick={() => handleSocialSignup('linkedin')}
                  className="p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              {signupMethod === 'phone' ? (
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Enter OTP</label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  className="w-full p-3 border rounded-lg text-center text-2xl tracking-wider"
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-sm text-gray-500 text-center">
                  OTP sent to {formData.phone}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}