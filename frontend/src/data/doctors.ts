import { Doctor } from '../types';
import { generateDoctorSlots } from '../utils/slots';
import { Specialty } from './specialties';

export const doctors: Doctor[] = [
  // Cardiologists
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 15,
    rating: 4.9,
    patientsServed: 8000,
    education: [
      'MD in Cardiology - AIIMS Delhi',
      'DM Cardiology - PGI Chandigarh'
    ],
    description: 'Expert in interventional cardiology and heart disease management.',
    languages: ['English', 'Hindi', 'Punjabi'],
    awards: ['Best Cardiologist 2023 - Times Health'],
    consultationFee: 1500
  },
  {
    id: '2',
    name: 'Dr. Priya Mehta',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 12,
    rating: 4.8,
    patientsServed: 6000,
    education: [
      'MD Cardiology - KEM Hospital Mumbai',
      'Fellowship in Cardiac Electrophysiology - UK'
    ],
    description: 'Specialized in cardiac rhythm disorders and pacemaker implantation.',
    languages: ['English', 'Hindi', 'Gujarati'],
    awards: ['Young Investigator Award - CSI'],
    consultationFee: 1800
  },

  // Dermatologists
  {
    id: '3',
    name: 'Dr. Anjali Desai',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 10,
    rating: 4.9,
    patientsServed: 12000,
    education: [
      'MD Dermatology - JIPMER',
      'Fellowship in Cosmetic Dermatology - Singapore'
    ],
    description: 'Expert in advanced skincare and aesthetic procedures.',
    languages: ['English', 'Hindi', 'Marathi'],
    awards: ['Best Dermatologist - Cosmetic Clinic Awards 2023'],
    consultationFee: 1200
  },
  {
    id: '4',
    name: 'Dr. Kabir Malhotra',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 8,
    rating: 4.7,
    patientsServed: 9000,
    education: [
      'MD Dermatology - MAMC Delhi',
      'Advanced Training in Trichology - Mumbai'
    ],
    description: 'Specialized in hair restoration and skin disorders.',
    languages: ['English', 'Hindi', 'Punjabi'],
    awards: ['Rising Star in Dermatology 2022'],
    consultationFee: 1000
  },

  // Pediatricians
  {
    id: '5',
    name: 'Dr. Meera Reddy',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 14,
    rating: 4.9,
    patientsServed: 15000,
    education: [
      'MD Pediatrics - CMC Vellore',
      'Fellowship in Neonatology - USA'
    ],
    description: 'Experienced in newborn care and pediatric emergencies.',
    languages: ['English', 'Hindi', 'Telugu'],
    awards: ['Excellence in Child Care 2023'],
    consultationFee: 1000
  },
  {
    id: '6',
    name: 'Dr. Arjun Nair',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 11,
    rating: 4.8,
    patientsServed: 11000,
    education: [
      'MD Pediatrics - KGMU Lucknow',
      'DNB Pediatrics'
    ],
    description: 'Specialized in pediatric respiratory disorders.',
    languages: ['English', 'Hindi', 'Malayalam'],
    awards: ['Best Pediatrician - Kerala Medical Awards'],
    consultationFee: 900
  },

  // Neurologists
  {
    id: '7',
    name: 'Dr. Sanjay Gupta',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 20,
    rating: 4.9,
    patientsServed: 18000,
    education: [
      'DM Neurology - NIMHANS Bangalore',
      'Research Fellowship - Johns Hopkins'
    ],
    description: 'Expert in stroke management and neurological disorders.',
    languages: ['English', 'Hindi', 'Bengali'],
    awards: ['Lifetime Achievement in Neurology 2022'],
    consultationFee: 2000
  },
  {
    id: '8',
    name: 'Dr. Neha Kapoor',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 13,
    rating: 4.8,
    patientsServed: 9000,
    education: [
      'DM Neurology - AIIMS Delhi',
      'Fellowship in Epilepsy - UK'
    ],
    description: 'Specialized in epilepsy management and headache disorders.',
    languages: ['English', 'Hindi', 'Punjabi'],
    awards: ['Young Neurologist Award 2023'],
    consultationFee: 1800
  },

  // Orthopedists
  {
    id: '9',
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 16,
    rating: 4.9,
    patientsServed: 14000,
    education: [
      'MS Orthopedics - PGIMER Chandigarh',
      'Fellowship in Joint Replacement - Germany'
    ],
    description: 'Expert in joint replacement and sports injuries.',
    languages: ['English', 'Hindi', 'Punjabi'],
    awards: ['Best Orthopedic Surgeon 2023'],
    consultationFee: 1500
  },
  {
    id: '10',
    name: 'Dr. Arun Kumar',
    specialty: 'Orthopedist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    experience: 12,
    rating: 4.7,
    patientsServed: 10000,
    education: [
      'MS Orthopedics - JIPMER',
      'Fellowship in Spine Surgery - USA'
    ],
    description: 'Specialized in spine surgery and minimally invasive procedures.',
    languages: ['English', 'Hindi', 'Tamil'],
    awards: ['Excellence in Spine Surgery 2022'],
    consultationFee: 1400
  }
].map(doctor => ({
  ...doctor,
  availableSlots: generateDoctorSlots()
}));

export { specialties } from './specialties';