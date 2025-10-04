import React from 'react';
import { format, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availableDates: string[];
}

export function Calendar({ selectedDate, onDateSelect, availableDates }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = isSameDay(date, selectedDate);
      const isToday = isSameDay(date, today);
      const isAvailable = availableDates.includes(format(date, 'yyyy-MM-dd'));
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));

      days.push(
        <button
          key={day}
          onClick={() => !isPast && isAvailable && onDateSelect(date)}
          disabled={isPast || !isAvailable}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isSelected
              ? 'bg-blue-600 text-white'
              : isToday
              ? 'border-2 border-blue-600 text-blue-600'
              : isPast
              ? 'text-gray-300 cursor-not-allowed'
              : isAvailable
              ? 'hover:bg-blue-50 text-gray-900 dark:text-white dark:hover:bg-blue-900/50'
              : 'text-gray-300 cursor-not-allowed'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
}