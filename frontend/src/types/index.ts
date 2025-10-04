export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  experience: number;
  rating: number;
  patientsServed: number;
  education: string[];
  availableSlots: TimeSlot[];
  description: string;
  languages: string[];
  awards: string[];
  location?: Location;
  consultationFee?: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  date: string;
  isBooked: boolean;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar?: string;
  favorites: string[];
}

export interface Review {
  id: string;
  doctorId?: string;
  patientId?: string;
  author: string;
  rating: number;
  comment: string;
  createdAt?: string;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'system';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  details: {
    brand?: string;
    last4?: string;
  };
  isDefault?: boolean;
}

export interface MedicalHistory {
  allergies: string[];
  medications: Medication[];
  conditions: string[];
  bloodGroup: string;
  lastUpdated: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}