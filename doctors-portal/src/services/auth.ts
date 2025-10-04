import api from './api';
import { AuthResponse, LoginRequest, RegisterDoctorRequest } from '../../../shared/types';

export const authService = {
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
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorUser');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('doctorUser');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('doctorToken');
  },
};