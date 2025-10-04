import React, { useState } from 'react';
import { DoctorCard } from '../components/DoctorCard';
import { BookingModal } from '../components/BookingModal';
import { BookCallModal } from '../components/BookCallModal';
import { doctors, specialties } from '../data/doctors';
import { Doctor, TimeSlot } from '../types';
import { Search, SlidersHorizontal, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';
import { isAuthenticated } from '../utils/auth';

export function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience'>('rating');
  const [showBookCallModal, setShowBookCallModal] = useState(false);

  const languages = Array.from(
    new Set(doctors.flatMap(doctor => doctor.languages))
  ).sort();

  const filteredDoctors = doctors
    .filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty ? doctor.specialty === selectedSpecialty : true) &&
      (selectedLanguage ? doctor.languages.includes(selectedLanguage) : true)
    )
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.experience - a.experience);

  const handleBookAppointment = (doctorId: string) => {
    if (!isAuthenticated()) {
      toast.error('Please sign in to book an appointment');
      return;
    }
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
    }
  };

  const handleBooking = (slot: TimeSlot) => {
    if (selectedDoctor) {
      // Update the slot status
      const updatedSlots = selectedDoctor.availableSlots.map(s =>
        s.id === slot.id ? { ...s, isBooked: true } : s
      );
      
      // Update the doctor's available slots
      const updatedDoctor = {
        ...selectedDoctor,
        availableSlots: updatedSlots
      };

      // Here you would typically make an API call to update the booking
      console.log('Booking confirmed:', {
        doctorId: selectedDoctor.id,
        slot,
        patient: 'current_user'
      });

      toast.success('Appointment booked successfully!');
      setSelectedDoctor(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find a Doctor</h1>
        
        <button
          onClick={() => setShowBookCallModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Book a Call (5 min)</span>
        </button>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map(language => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>
        
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-gray-400 dark:text-gray-300" />
          <select
            className="px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience')}
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
      </div>

      {/* Doctor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>

      {/* Booking modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBook={handleBooking}
        />
      )}

      {/* Book Call Modal */}
      {showBookCallModal && (
        <BookCallModal onClose={() => setShowBookCallModal(false)} />
      )}
    </div>
  );
}