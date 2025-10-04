import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { login } from '../utils/auth';
import { toast } from 'sonner';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: any) => void;
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      onLogin(user);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      // Simulate password reset email
      toast.success('Password reset link sent to your email');
      setShowForgotPassword(false);
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
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
          {showForgotPassword ? 'Reset Password' : 'Login to MediBook'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
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

          {!showForgotPassword && (
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
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Please wait...' : (showForgotPassword ? 'Send Reset Link' : 'Login')}
          </button>

          {showForgotPassword && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-4 w-full text-gray-600 dark:text-gray-400 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}