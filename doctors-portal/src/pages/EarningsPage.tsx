import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Filter } from 'lucide-react';

export function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data - replace with API calls
  const earningsStats = {
    totalEarnings: 8450,
    thisMonth: 2150,
    lastMonth: 1980,
    growth: 8.6,
    totalConsultations: 156,
    averagePerConsultation: 54.17
  };

  const recentTransactions = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      date: '2024-01-25',
      type: 'Video Consultation',
      amount: 75,
      status: 'completed'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      date: '2024-01-24',
      type: 'Audio Consultation',
      amount: 50,
      status: 'completed'
    },
    {
      id: 3,
      patient: 'Emily Davis',
      date: '2024-01-24',
      type: 'Chat Consultation',
      amount: 35,
      status: 'pending'
    },
    {
      id: 4,
      patient: 'John Smith',
      date: '2024-01-23',
      type: 'Video Consultation',
      amount: 75,
      status: 'completed'
    }
  ];

  const monthlyData = [
    { month: 'Jan', earnings: 2150 },
    { month: 'Feb', earnings: 2380 },
    { month: 'Mar', earnings: 2100 },
    { month: 'Apr', earnings: 2450 },
    { month: 'May', earnings: 2200 },
    { month: 'Jun', earnings: 2600 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Earnings & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Track your consultation earnings and financial performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Earnings
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${earningsStats.totalEarnings.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                This Month
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${earningsStats.thisMonth.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +{earningsStats.growth}% from last month
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Consultations
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {earningsStats.totalConsultations}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Avg per Consultation
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${earningsStats.averagePerConsultation.toFixed(2)}
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Earnings Overview
                </h3>
                <div className="flex space-x-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Simple bar chart representation */}
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                      {data.month}
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                      <div
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(data.earnings / 3000) * 100}%` }}
                      >
                        <span className="text-white text-xs font-medium">
                          ${data.earnings}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Transactions
                </h3>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {transaction.patient}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.type}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${transaction.amount}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Consultation Rates
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Video Consultation</span>
                <span className="font-semibold text-gray-900 dark:text-white">$75</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Audio Consultation</span>
                <span className="font-semibold text-gray-900 dark:text-white">$50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Chat Consultation</span>
                <span className="font-semibold text-gray-900 dark:text-white">$35</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">In-Person Visit</span>
                <span className="font-semibold text-gray-900 dark:text-white">$120</span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Update Rates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}