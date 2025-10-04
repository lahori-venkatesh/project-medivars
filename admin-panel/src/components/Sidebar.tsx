import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  BarChart3, 
  Settings,
  Stethoscope
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Doctors', href: '/doctors', icon: UserCheck },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="flex items-center justify-center h-16 border-b">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">MediVars Admin</span>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};