// User Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  profileImage?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory?: Array<{
    condition: string;
    diagnosedDate: Date;
    notes: string;
  }>;
  allergies?: string[];
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  isActive: boolean;
  emailVerified: boolean;
  likedDoctors: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Doctor Types
export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  experience: number;
  education: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  certifications: string[];
  profileImage?: string;
  bio?: string;
  consultationFee: {
    audio: number;
    video: number;
    chat: number;
    inPerson: number;
  };
  availability: Array<{
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    slots: Array<{
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    }>;
  }>;
  rating: {
    average: number;
    count: number;
  };
  reviews: Array<{
    patient: string;
    rating: number;
    comment: string;
    date: Date;
  }>;
  isVerified: boolean;
  isActive: boolean;
  documents: Array<{
    type: string;
    url: string;
    verified: boolean;
  }>;
  languages: string[];
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Appointment Types
export interface Appointment {
  _id: string;
  patient: string | User;
  doctor: string | Doctor;
  appointmentDate: Date;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  consultationType: 'audio' | 'video' | 'chat' | 'in-person';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  urgency: 'low' | 'medium' | 'high';
  symptoms: string;
  notes: {
    patient?: string;
    doctor?: string;
  };
  prescription: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  payment: {
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentId?: string;
    paymentMethod?: string;
  };
  meetingLink?: string;
  reminderSent: boolean;
  followUpRequired: boolean;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'patient' | 'doctor' | 'admin';
    isVerified?: boolean;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  role: 'patient' | 'doctor';
}

export interface RegisterPatientRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
}

export interface RegisterDoctorRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  experience: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}