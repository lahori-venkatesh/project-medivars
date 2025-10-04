import React from 'react';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';

const stats = [
  { name: 'Total Patients', value: '1,234', icon: Users, color: 'bg-blue-500' },
  { name: 'Active Doctors', value: '89', icon: UserCheck, color: 'bg-green-500' },
  { name: 'Appointments Today', value: '156', icon: Calendar, color: 'bg-yellow-500' },
  { name: 'Revenue This Month', value: '$45,678', icon: DollarSign, color: 'bg-purple-500' },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome to MediVars Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-md`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-2 w-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                New doctor registration: Dr. Sarah Johnson
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-2 w-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Patient John Doe booked an appointment
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-2 w-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Payment of $150 received from appointment #1234
              </p>
              <span className="text-xs text-gray-400">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};