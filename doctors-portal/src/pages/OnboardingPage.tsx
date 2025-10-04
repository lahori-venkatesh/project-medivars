import React from 'react';
import { CheckCircle, Clock, Upload, FileText } from 'lucide-react';

export function OnboardingPage() {
  const onboardingSteps = [
    {
      id: 1,
      title: 'Profile Setup',
      description: 'Complete your professional profile',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Document Verification',
      description: 'Upload medical license and certifications',
      status: 'pending',
      icon: Upload
    },
    {
      id: 3,
      title: 'Background Check',
      description: 'Administrative review of credentials',
      status: 'waiting',
      icon: Clock
    },
    {
      id: 4,
      title: 'Platform Training',
      description: 'Complete platform orientation',
      status: 'waiting',
      icon: FileText
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'waiting': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to MediVars, Dr. Smith!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let's get your account set up so you can start helping patients
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Onboarding Progress
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              1 of 4 steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Onboarding Steps */}
        <div className="space-y-6">
          {onboardingSteps.map((step, index) => (
            <div
              key={step.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${getStatusColor(step.status)}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {step.description}
                  </p>
                </div>
                <div>
                  {step.status === 'completed' && (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Completed
                    </span>
                  )}
                  {step.status === 'pending' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Continue
                    </button>
                  )}
                  {step.status === 'waiting' && (
                    <span className="text-gray-500 dark:text-gray-400">
                      Waiting
                    </span>
                  )}
                </div>
              </div>

              {/* Step Details */}
              {step.id === 2 && step.status === 'pending' && (
                <div className="mt-6 pl-16">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Required Documents:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Medical License (PDF or JPG)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Board Certification (PDF or JPG)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Professional ID (PDF or JPG)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Malpractice Insurance (Optional)</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Upload Documents
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Need Help?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Our support team is here to help you through the onboarding process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
              View FAQ
            </button>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 mt-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-300">
                Verification in Progress
              </h3>
              <p className="text-yellow-800 dark:text-yellow-200 mt-1">
                Your account is currently under review. This process typically takes 2-3 business days.
                You'll receive an email notification once your verification is complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}