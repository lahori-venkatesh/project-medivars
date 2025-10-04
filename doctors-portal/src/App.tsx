import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SupportButton } from './components/SupportButton';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { PatientsPage } from './pages/PatientsPage';
import { SchedulePage } from './pages/SchedulePage';
import { EarningsPage } from './pages/EarningsPage';
import { ProfilePage } from './pages/ProfilePage';
import { MessagesPage } from './pages/MessagesPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <OnboardingPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <AppointmentsPage />
                  </ProtectedRoute>
                } />
                <Route path="/patients" element={
                  <ProtectedRoute>
                    <PatientsPage />
                  </ProtectedRoute>
                } />
                <Route path="/schedule" element={
                  <ProtectedRoute>
                    <SchedulePage />
                  </ProtectedRoute>
                } />
                <Route path="/earnings" element={
                  <ProtectedRoute>
                    <EarningsPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <SupportButton />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}