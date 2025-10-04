import api from './api';
import { AuthResponse, LoginRequest, RegisterPatientRequest, RegisterDoctorRequest } from '../../../shared/types';

export const authService = {
  // Patient registration
  registerPatient: async (data: RegisterPatientRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/patient', data);
    return response.data;
  },

  // Doctor registration
  registerDoctor: async (data: RegisterDoctorRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/doctor', data);
    return response.data;
  },

  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};