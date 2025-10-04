import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { 
  LayoutDashboard, 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut,
  X 
} from 'lucide-react';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  user: User | null;
  onSignupClick: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn,
  user,
  onSignupClick,
}: MobileMenuProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="p-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {isLoggedIn && user && (
          <div className="mb-6 mt-8">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg">
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <Link
            to="/"
            className="block px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/doctors"
            className="block px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            onClick={onClose}
          >
            Find Doctors
          </Link>
          <Link
            to="/appointments"
            className="block px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            onClick={onClose}
          >
            Appointments
          </Link>

          {isLoggedIn && (
            <>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />
              
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                onClick={onClose}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              
              <Link
                to="/liked-doctors"
                className="flex items-center px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                onClick={onClose}
              >
                <Heart className="w-5 h-5 mr-3" />
                Liked Doctors
              </Link>
              
              <Link
                to="/messages"
                className="flex items-center px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                onClick={onClose}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Messages
              </Link>
              
              <Link
                to="/profile/settings"
                className="flex items-center px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                onClick={onClose}
              >
                <Settings className="w-5 h-5 mr-3" />
                Profile Settings
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <button
              onClick={() => {
                onSignupClick();
                onClose();
              }}
              className="w-full mt-4 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}