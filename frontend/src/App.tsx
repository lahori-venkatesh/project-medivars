import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SupportButton } from './components/SupportButton';
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { DashboardPage } from './pages/DashboardPage';
import { LikedDoctorsPage } from './pages/LikedDoctorsPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DoctorSignupPage } from './pages/DoctorSignupPage';
import { DoctorOnboardingPage } from './pages/DoctorOnboardingPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Admin route guard
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('adminToken');
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/liked-doctors" element={<LikedDoctorsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile/settings" element={<ProfileSettingsPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/doctor/signup" element={<DoctorSignupPage />} />
              <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <SupportButton />
        </div>
      </Router>
    </ThemeProvider>
  );
}