import React from 'react';
import { Clock } from 'lucide-react';
import { TimeSlot } from '../../types';

interface TimeSlotPickerProps {
  availableSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function TimeSlotPicker({ availableSlots, selectedSlot, onSelectSlot }: TimeSlotPickerProps) {
  // Group slots by morning/afternoon/evening
  const groupedSlots = {
    morning: availableSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 9 && hour < 12;
    }),
    afternoon: availableSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 12 && hour < 16;
    }),
    evening: availableSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 16;
    })
  };

  return (
    <div>
      <h4 className="font-medium mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Available Slots
      </h4>

      {Object.entries(groupedSlots).map(([timeOfDay, slots]) => (
        slots.length > 0 && (
          <div key={timeOfDay} className="mb-4">
            <h5 className="text-sm font-medium text-gray-600 mb-2 capitalize">
              {timeOfDay}
            </h5>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => onSelectSlot(slot)}
                  disabled={slot.isBooked}
                  className={`
                    p-2 rounded border text-sm transition-colors
                    ${selectedSlot?.id === slot.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : slot.isBooked
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )
      ))}

      {availableSlots.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No available slots for this date
        </p>
      )}
    </div>
  );
}