import React, { useState } from 'react';
import { Search, Calendar, Clock, PhoneCall, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookCallModal } from './BookCallModal';

export function HeroSection() {
  const navigate = useNavigate();
  const [showBookCallModal, setShowBookCallModal] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10 space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Expert Healthcare
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-200">
                  At Your Fingertips
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Connect with certified doctors instantly for personalized care. Get medical advice, prescriptions, and support from the comfort of your home.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/doctors')}
                className="group bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Search className="w-5 h-5" />
                <span>Find Your Doctor</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowBookCallModal(true)}
                className="group relative overflow-hidden bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-white"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Book Instant Call</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                  5 min
                </span>
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-sm text-blue-200">Verified Doctors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-blue-200">Happy Patients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.9/5</div>
                <div className="text-sm text-blue-200">Patient Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Images Grid */}
          <div className="relative mt-12 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
              <div className="space-y-3 md:space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600"
                    alt="Doctor consulting"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
                    alt="Medical consultation"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 mt-8">
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=600"
                    alt="Doctor with technology"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600"
                    alt="Doctor with stethoscope"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-xl font-semibold flex items-center gap-2 backdrop-blur-sm hover:bg-blue-50 transition-colors">
                <Clock className="w-5 h-5" />
                24/7 Care Available
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>

      {showBookCallModal && (
        <BookCallModal onClose={() => setShowBookCallModal(false)} />
      )}
    </div>
  );
}