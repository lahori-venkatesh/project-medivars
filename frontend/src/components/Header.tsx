import React, { useState } from 'react';
import { Stethoscope, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignupModal } from './SignupModal';
import { ProfileDropdown } from './ProfileDropdown';
import { MobileMenu } from './MobileMenu';
import { NavigationLinks } from './NavigationLinks';
import { isAuthenticated, getUser } from '../utils/auth';

export function Header() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = isAuthenticated();
  const user = getUser();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              Medivars
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationLinks />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* User Profile/Sign Up */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 dark:text-blue-300 font-semibold">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:inline font-medium">{user?.name || 'User'}</span>
                </button>
                {showProfileDropdown && (
                  <ProfileDropdown onClose={() => setShowProfileDropdown(false)} />
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowSignupModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          isLoggedIn={isLoggedIn}
          user={user}
          onSignupClick={() => {
            setIsMobileMenuOpen(false);
            setShowSignupModal(true);
          }}
        />
      </div>

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={(name, email, mobile, password) => {
            console.log('Signup:', { name, email, mobile, password });
            setShowSignupModal(false);
          }}
        />
      )}
    </header>
  );
}