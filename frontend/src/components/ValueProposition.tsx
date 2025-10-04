import React from 'react';
import { 
  Shield, 
  Clock, 
  Users, 
  Heart,
  Video,
  CreditCard,
  FileText,
  Stethoscope 
} from 'lucide-react';

const benefits = [
  {
    
    icon: Shield,
    title: "Top Certified Doctors",
    description: "Verified and experienced professionals from reputed hospitals",
    color: "blue"
  },
  {
    icon: Video,
    title: "Instant Online Consultation",
    description: "Connect with doctors in minutes via chat, video, or call",
    color: "green"
  },
  {
    icon: CreditCard,
    title: "Affordable & Transparent",
    description: "No hidden fees, pay per consultation or subscription",
    color: "purple"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Consult anytime, even during emergencies",
    color: "red"
  },
  {
    icon: FileText,
    title: "Digital Health Records",
    description: "Get prescriptions and medical records instantly",
    color: "orange"
  },
  {
    icon: Stethoscope,
    title: "Specialist Doctors",
    description: "From general physicians to mental health experts",
    color: "teal"
  }
];

export function ValueProposition() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose MediBook for Your Healthcare Needs?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience healthcare reimagined with our comprehensive suite of services designed around your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colors = {
              blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
              green: "bg-green-50 text-green-600 dark:bg-green-900/50 dark:text-green-400",
              purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
              red: "bg-red-50 text-red-600 dark:bg-red-900/50 dark:text-red-400",
              orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
              teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400"
            };

            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl ${colors[benefit.color]} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 mb-8">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Trusted by 50,000+ Patients</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Patients</div>
            </div>
            <div className="flex flex-col items-center">
              <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Expert Doctors</div>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-400">Patient Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}