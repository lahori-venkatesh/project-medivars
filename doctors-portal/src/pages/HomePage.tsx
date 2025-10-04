import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  DollarSign, 
  Shield, 
  Clock,
  Video,
  MessageSquare,
  Star,
  ArrowRight
} from 'lucide-react';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Manage your availability and appointments with our intelligent scheduling system.'
    },
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Conduct secure video consultations with patients from anywhere.'
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Access patient records, medical history, and consultation notes in one place.'
    },
    {
      icon: DollarSign,
      title: 'Earnings Tracking',
      description: 'Monitor your earnings, payment history, and financial analytics.'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'All communications and data are fully encrypted and HIPAA compliant.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get technical support and assistance whenever you need it.'
    }
  ];

  const stats = [
    { label: 'Active Doctors', value: '2,500+' },
    { label: 'Patient Consultations', value: '50,000+' },
    { label: 'Average Rating', value: '4.9/5' },
    { label: 'Countries Served', value: '25+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Empower Your
                <span className="text-blue-200"> Medical Practice</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of healthcare professionals using MediVars to provide 
                exceptional patient care through our advanced telemedicine platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                    >
                      Join as Doctor
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-sm text-blue-200">Appointments Today</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-bold">1,200</div>
                    <div className="text-sm text-blue-200">Active Patients</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Star className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm text-blue-200">Average Rating</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-bold">$8.5K</div>
                    <div className="text-sm text-blue-200">Monthly Earnings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and features you need 
              to deliver exceptional healthcare services online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of healthcare professionals who trust MediVars for their telemedicine needs.
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}