import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MessageSquare, User, Filter, Search } from 'lucide-react';

export function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with API calls
  const appointments = [
    {
      id: 1,
      patient: {
        name: 'Sarah Johnson',
        age: 32,
        avatar: null
      },
      date: '2024-01-25',
      time: '10:00 AM - 10:30 AM',
      type: 'video',
      status: 'confirmed',
      symptoms: 'Headache and fever',
      notes: 'Follow-up appointment'
    },
    {
      id: 2,
      patient: {
        name: 'Michael Chen',
        age: 45,
        avatar: null
      },
      date: '2024-01-25',
      time: '11:30 AM - 12:00 PM',
      type: 'audio',
      status: 'pending',
      symptoms: 'Chest pain',
      notes: 'New patient consultation'
    },
    {
      id: 3,
      patient: {
        name: 'Emily Davis',
        age: 28,
        avatar: null
      },
      date: '2024-01-25',
      time: '2:00 PM - 2:30 PM',
      type: 'chat',
      status: 'completed',
      symptoms: 'Skin rash',
      notes: 'Prescription provided'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageSquare className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Appointments
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your patient appointments and consultations
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'today', label: 'Today' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">
                    {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {appointment.patient.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Age: {appointment.patient.age}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                    {getTypeIcon(appointment.type)}
                    <span className="text-sm capitalize">{appointment.type}</span>
                  </div>
                </div>
                
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Symptoms
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {appointment.symptoms}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {appointment.notes}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-3">
              {appointment.status === 'pending' && (
                <>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    Decline
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    Accept
                  </button>
                </>
              )}
              {appointment.status === 'confirmed' && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  Start Consultation
                </button>
              )}
              {appointment.status === 'completed' && (
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            You don't have any appointments for the selected period.
          </p>
        </div>
      )}
    </div>
  );
}