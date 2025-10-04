import React, { useState } from 'react';
import { DoctorCard } from '../components/DoctorCard';
import { doctors } from '../data/doctors';
import { getUser, updateUser } from '../utils/auth';
import { Heart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { BookingModal } from '../components/BookingModal'; // Updated import
import { Doctor, TimeSlot } from '../types';

export function LikedDoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const user = getUser();
  const likedDoctors = doctors.filter(doctor => 
    user?.favorites?.includes(doctor.id)
  );

  const handleRemoveFavorite = (doctorId: string) => {
    if (!user) return;

    const updatedFavorites = user.favorites.filter(id => id !== doctorId);
    const updated = updateUser({ favorites: updatedFavorites });
    
    if (updated) {
      toast.success('Doctor removed from favorites');
      // Force re-render
      window.location.reload();
    }
  };

  const handleBookAppointment = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
    }
  };

  const handleBookingConfirm = (slot: TimeSlot) => {
    if (selectedDoctor) {
      // Handle booking logic here
      toast.success('Appointment booked successfully!');
      setSelectedDoctor(null);
    }
  };

  if (likedDoctors.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Liked Doctors</h1>
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">No liked doctors yet</h2>
          <p className="text-gray-500 mb-4">
            Like doctors to save them here for quick access
          </p>
          <button
            onClick={() => window.location.href = '/doctors'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Liked Doctors</h1>
        <p className="text-gray-600">
          {likedDoctors.length} {likedDoctors.length === 1 ? 'doctor' : 'doctors'} saved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedDoctors.map((doctor) => (
          <div key={doctor.id} className="relative group">
            <DoctorCard
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
            <button
              onClick={() => handleRemoveFavorite(doctor.id)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
              title="Remove from favorites"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBook={handleBookingConfirm}
        />
      )}
    </div>
  );
}