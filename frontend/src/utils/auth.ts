import { User } from '../types';

export async function login(email: string, password: string) {
  try {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      mobile: '+1234567890',
      favorites: [] // Initialize empty favorites array
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token');

    return mockUser;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function signUp(name: string, email: string, mobile: string, password: string) {
  try {
    // Simulate API call
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      mobile,
      favorites: [] // Initialize empty favorites array
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token');

    return { user: mockUser, token: 'mock-token' };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export function getUser(): User | null {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    // Ensure favorites array exists
    if (!user.favorites) {
      user.favorites = [];
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export function updateUser(userData: Partial<User>): User | null {
  try {
    const currentUser = getUser();
    if (currentUser) {
      const updatedUser = { 
        ...currentUser, 
        ...userData,
        favorites: userData.favorites || currentUser.favorites || [] // Ensure favorites array
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}