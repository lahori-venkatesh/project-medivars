import React, { useState } from 'react';
import { Star, Clock, GraduationCap, Award, Heart, MessageCircle, Users } from 'lucide-react';
import { Doctor } from '../types';
import { toggleFavoriteDoctor, isDocktorLiked } from '../utils/favorites';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';
import { toast } from 'sonner';
import { startChat } from '../services/chat';
import { BookingModal } from './BookingModal';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctorId: string) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const [isFavorite, setIsFavorite] = useState(isDocktorLiked(doctor.id));
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated()) {
      toast.error('Please sign in to like doctors');
      return;
    }
    const newState = toggleFavoriteDoctor(doctor.id);
    setIsFavorite(newState);
  };

  const handleChatClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated()) {
      toast.error('Please sign in to chat with doctors');
      return;
    }

    try {
      const threadId = await startChat(doctor.id);
      navigate('/messages', { state: { threadId } });
    } catch (error) {
      toast.error('Failed to start chat');
    }
  };

  const handleBookAppointment = () => {
    if (!isAuthenticated()) {
      toast.error('Please sign in to book an appointment');
      return;
    }
    
    if (onBookAppointment) {
      onBookAppointment(doctor.id);
    } else {
      setShowBookingModal(true);
    }
  };

  const handleBookingSuccess = (slot: any) => {
    toast.success('Appointment booked successfully!');
    setShowBookingModal(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        {/* Doctor card content */}
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleChatClick}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Chat with doctor"
            >
              <MessageCircle className="w-5 h-5 text-blue-500" />
            </button>
            <button
              onClick={toggleFavorite}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{doctor.name}</h3>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded">
                {doctor.specialty}
              </span>
            </div>
          </div>

          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="ml-1 text-gray-600 dark:text-gray-300">{doctor.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="ml-1 text-gray-600 dark:text-gray-300">{doctor.experience} years</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="ml-1 text-gray-600 dark:text-gray-300">{doctor.patientsServed}+ patients</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <GraduationCap className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                {doctor.education.map((edu, index) => (
                  <div key={index} className="mb-1">{edu}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.awards[0]}</span>
          </div>

          <button
            onClick={handleBookAppointment}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          doctor={doctor}
          onClose={() => setShowBookingModal(false)}
          onBook={handleBookingSuccess}
        />
      )}
    </>
  );
}