import { format, parseISO, isSameDay } from 'date-fns';

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
}

export function formatDisplayDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM d, yyyy');
}

export function formatTime(time: string): string {
  return time;
}

export function isSameDayAs(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(d1, d2);
}