import { addDays, setHours, setMinutes, format } from 'date-fns';
import { TimeSlot } from '../types';

const HOURS = [9, 10, 11, 14, 15, 16, 17];

export function generateDoctorSlots(daysAhead = 14): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let day = 0; day < daysAhead; day++) {
    const date = addDays(today, day);
    
    HOURS.forEach((hour) => {
      [0, 30].forEach((minute) => {
        const slotTime = setMinutes(setHours(date, hour), minute);
        
        slots.push({
          id: `slot-${format(slotTime, 'yyyy-MM-dd-HH-mm')}`,
          date: format(date, 'yyyy-MM-dd'),
          time: format(slotTime, 'hh:mm a'),
          isBooked: Math.random() > 0.7 // Randomly mark some slots as booked
        });
      });
    });
  }

  return slots;
}