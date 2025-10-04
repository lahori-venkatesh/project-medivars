import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Star,
  Video,
  MessageSquare,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export function DashboardPage() {
  // Mock data - replace with API calls
  const stats = [
    {
      title: 'Today\'s Appointments',
      value: '12',
      change: '+2 from yesterday',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+15 this week',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Earnings',
      value: '$8,450',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Average Rating',
      value: '4.9',
      change: '128 reviews',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '11:30 AM',
      type: 'audio',
      status: 'pending'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '2:00 PM',
      type: 'chat',
      status: 'confirmed'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'appointment',
      message: 'Completed consultation with John Doe',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from Sarah Johnson',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Profile verification pending',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Good morning, Dr. Smith
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here's what's happening with your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Appointments
                </h2>
                <Link
                  to="/appointments"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {appointment.patient}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {appointment.status}
                      </span>
                      {appointment.type === 'video' && (
                        <Video className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No appointments scheduled for today
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <Link
                to="/schedule"
                className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Update Schedule
                </span>
              </Link>
              <Link
                to="/patients"
                className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  View Patients
                </span>
              </Link>
              <Link
                to="/earnings"
                className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  View Earnings
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}