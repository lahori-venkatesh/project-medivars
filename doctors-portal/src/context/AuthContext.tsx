import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    const userData = localStorage.getItem('doctorUser');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password, role: 'doctor' });
      
      localStorage.setItem('doctorToken', response.token);
      localStorage.setItem('doctorUser', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authService.registerDoctor(data);
      
      localStorage.setItem('doctorToken', response.token);
      localStorage.setItem('doctorUser', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorUser');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};