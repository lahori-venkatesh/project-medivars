import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 text-center md:text-left md:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold">Medivars</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
              Making healthcare accessible and convenient for everyone.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-white transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-400 hover:text-white transition-colors">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link to="/doctor/signup" className="text-gray-400 hover:text-white transition-colors">
                  Join as Doctor
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4 flex justify-center md:justify-start">
              <a
                href="https://forms.gle/1aMsD6CKXMLMJuLn7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 mt-10 rounded-md transition-colors"
              >
                Give Feedback
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright and Theme Toggle */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-center space-x-10">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Medivars. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}