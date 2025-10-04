import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Download,
  BarChart2,
  Calendar,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';
import { DoctorProfileModal } from '../components/admin/DoctorProfileModal';

interface DoctorProfile {
  id: string;
  name: string;
  specialization: string;
  status: 'pending' | 'approved' | 'rejected';
  location: string;
  experience: number;
  submittedAt: string;
  documents: {
    license: string;
    idProof: string;
    addressProof?: string;
  };
}

export function AdminDashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);

  // Mock data for demonstration
  const doctorProfiles: DoctorProfile[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiologist',
      status: 'pending',
      location: 'Mumbai',
      experience: 10,
      submittedAt: '2024-03-15',
      documents: {
        license: 'license.pdf',
        idProof: 'id.pdf',
        addressProof: 'address.pdf'
      }
    },
    // Add more mock profiles...
  ];

  const handleApprove = (doctorId: string) => {
    // Handle approval logic
    toast.success('Doctor profile approved');
  };

  const handleReject = (doctorId: string, reason: string) => {
    // Handle rejection logic
    toast.success('Doctor profile rejected');
  };

  const handleRequestInfo = (doctorId: string, message: string) => {
    // Handle additional info request
    toast.success('Information request sent to doctor');
  };

  const handleExportReport = () => {
    // Handle report export
    toast.success('Report downloaded successfully');
  };

  const handleViewProfile = (doctor: DoctorProfile) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleExportReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Doctors</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Approvals</p>
                <h3 className="text-2xl font-bold">23</h3>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approved This Month</p>
                <h3 className="text-2xl font-bold">45</h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rejected This Month</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Specialties</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatologist">Dermatologist</option>
              {/* Add more specialties */}
            </select>
          </div>
        </div>

        {/* Doctor Profiles Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {doctorProfiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {profile.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {profile.specialization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profile.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : profile.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {profile.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {profile.experience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewProfile(profile)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleApprove(profile.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(profile.id, 'Incomplete documentation')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onApprove={() => {
            handleApprove(selectedDoctor.id);
            setSelectedDoctor(null);
          }}
          onReject={(reason) => {
            handleReject(selectedDoctor.id, reason);
            setSelectedDoctor(null);
          }}
          onRequestInfo={(message) => {
            handleRequestInfo(selectedDoctor.id, message);
            setSelectedDoctor(null);
          }}
        />
      )}
    </div>
  );
}