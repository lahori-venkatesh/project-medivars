import React, { useState } from 'react';
import { X, Mail, Lock, Phone, User as UserIcon, Eye, EyeOff, Check } from 'lucide-react';
import { signUp, login } from '../utils/auth';
import { verifyOTP, sendOTP } from '../utils/otp';
import { SocialAuth } from './SocialAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SignupModalProps {
  onClose: () => void;
  onSignup: (name: string, email: string, mobile: string, password: string) => void;
}

export function SignupModal({ onClose, onSignup }: SignupModalProps) {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (showForgotPassword) {
        toast.success('Password reset link sent to your email');
        setShowForgotPassword(false);
        return;
      }

      if (isLoginMode) {
        const user = await login(email, password);
        onSignup(user.name, user.email, user.mobile, password);
        onClose();
        window.location.reload(); // Refresh to update auth state
      } else {
        if (!acceptTerms) {
          setError('Please accept the terms and conditions');
          setLoading(false);
          return;
        }
        
        if (step === 1) {
          const sent = await sendOTP(mobile);
          if (sent) {
            setStep(2);
            toast.success('OTP sent successfully');
          }
        } else {
          const isValid = await verifyOTP(mobile, otp);
          if (isValid) {
            await signUp(name, email, mobile, password);
            onSignup(name, email, mobile, password);
            onClose();
            // Redirect to onboarding page after successful signup
            navigate('/onboarding');
          } else {
            setError('Invalid OTP. Please try again.');
          }
        }
      }
    } catch (err) {
      setError(isLoginMode ? 'Invalid email or password.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {showForgotPassword ? 'Reset Password' : 
            (isLoginMode ? 'Welcome Back' : (step === 1 ? 'Create Account' : 'Verify Mobile Number'))}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {showForgotPassword ? (
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          ) : isLoginMode ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Forgot your password?
                </button>
              </div>
            </>
          ) : (
            step === 1 ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-4 mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                    Yes, I understand and agree to the{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </>
            ) : (
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We've sent a verification code to {mobile}
                </p>
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => sendOTP(mobile)}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Resend OTP
                </button>
              </div>
            )
          )}
          
          <button
            type="submit"
            disabled={loading || (!isLoginMode && step === 1 && !acceptTerms)}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
              (loading || (!isLoginMode && step === 1 && !acceptTerms)) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Please wait...' : (
              showForgotPassword ? 'Send Reset Link' :
              isLoginMode ? 'Login' : 
              (step === 1 ? 'Continue' : 'Verify & Sign Up')
            )}
          </button>

          {showForgotPassword && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-4 w-full text-gray-600 dark:text-gray-400 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Back to {isLoginMode ? 'Login' : 'Sign Up'}
            </button>
          )}
        </form>

        {!showForgotPassword && (
          <>
            <div className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
              {isLoginMode ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(false)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(true)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <SocialAuth onSuccess={() => {
                  onClose();
                  toast.success('Successfully signed in!');
                  window.location.reload(); // Refresh to update auth state
                }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}