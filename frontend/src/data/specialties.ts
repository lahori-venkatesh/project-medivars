export const specialties = [
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Orthopedist',
  'Psychiatrist',
  'Dentist',
  'Ophthalmologist',
  'ENT Specialist',
  'Gynecologist'
] as const;

export type Specialty = typeof specialties[number];