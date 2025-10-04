import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { BookingModal } from '../components/BookingModal'; // Updated import
import { toast } from 'sonner';
import { formatDate } from '../utils/date';
import { doctors } from '../data/doctors';

interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorId: '1',
      date: '2024-03-20',
      time: '09:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      doctorId: '2',
      date: '2024-03-22',
      time: '02:00 PM',
      status: 'pending'
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const handleCancel = (appointmentId: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    ));
    toast.success('Appointment cancelled successfully');
  };

  const handleReschedule = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setShowRescheduleModal(true);
    }
  };

  const handleRescheduleConfirm = (slot: any) => {
    if (selectedAppointment) {
      setAppointments(appointments.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, date: slot.date, time: slot.time, status: 'confirmed' }
          : apt
      ));
      setShowRescheduleModal(false);
      setSelectedAppointment(null);
      toast.success('Appointment rescheduled successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Appointments</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {appointments.map((appointment) => {
          const doctor = doctors.find(d => d.id === appointment.doctorId);
          if (!doctor) return null;

          return (
            <div
              key={appointment.id}
              className="border-b dark:border-gray-700 last:border-b-0 p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(new Date(appointment.date))}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : appointment.status === 'cancelled'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
                
                {appointment.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => handleReschedule(appointment.id)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {appointments.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No appointments found
          </div>
        )}
      </div>

      {showRescheduleModal && selectedAppointment && (
        <BookingModal
          doctor={doctors.find(d => d.id === selectedAppointment.doctorId)!}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedAppointment(null);
          }}
          onBook={handleRescheduleConfirm}
        />
      )}
    </div>
  );
}