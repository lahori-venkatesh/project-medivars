import React, { useState } from 'react';
import { Search, User, Calendar, Phone, Mail, FileText, Eye } from 'lucide-react';

export function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock data - replace with API calls
  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      lastVisit: '2024-01-20',
      totalVisits: 5,
      conditions: ['Hypertension', 'Diabetes'],
      avatar: null
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      lastVisit: '2024-01-18',
      totalVisits: 3,
      conditions: ['Asthma'],
      avatar: null
    },
    {
      id: 3,
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 345-6789',
      lastVisit: '2024-01-15',
      totalVisits: 8,
      conditions: ['Allergies', 'Migraine'],
      avatar: null
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Patients
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your patient records and medical history
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patients List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-semibold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {patient.age} years old • {patient.gender}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {patient.totalVisits} total visits
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{patient.phone}</span>
                    </div>
                  </div>
                  
                  {patient.conditions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Conditions:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No patients found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms.' : 'You haven\'t seen any patients yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Patient Details Sidebar */}
        <div>
          {selectedPatient ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold text-xl">
                    {selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedPatient.age} years old • {selectedPatient.gender}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{selectedPatient.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Visit History
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Last visit: {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Total visits: {selectedPatient.totalVisits}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedPatient.conditions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medical Conditions
                    </h4>
                    <div className="space-y-2">
                      {selectedPatient.conditions.map((condition: string, index: number) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full mr-2"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Schedule Appointment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Select a patient to view their details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}