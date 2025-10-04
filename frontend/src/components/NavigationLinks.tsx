import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NavigationLinks() {
  const location = useLocation();
  
  const links = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Find Doctors' },
    { path: '/appointments', label: 'Appointments' }
  ];

  return (
    <>
      {links.map(link => (
        <Link 
          key={link.path}
          to={link.path} 
          className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
            location.pathname === link.path ? 'font-medium text-blue-600 dark:text-blue-400' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}