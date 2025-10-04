import React, { useState } from 'react';
import { Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlot, setEditingSlot] = useState<any>(null);

  // Mock data - replace with API calls
  const [schedule, setSchedule] = useState({
    monday: [
      { id: 1, startTime: '09:00', endTime: '12:00', isAvailable: true },
      { id: 2, startTime: '14:00', endTime: '17:00', isAvailable: true }
    ],
    tuesday: [
      { id: 3, startTime: '09:00', endTime: '12:00', isAvailable: true },
      { id: 4, startTime: '14:00', endTime: '17:00', isAvailable: true }
    ],
    wednesday: [
      { id: 5, startTime: '09:00', endTime: '12:00', isAvailable: true }
    ],
    thursday: [
      { id: 6, startTime: '09:00', endTime: '12:00', isAvailable: true },
      { id: 7, startTime: '14:00', endTime: '17:00', isAvailable: true }
    ],
    friday: [
      { id: 8, startTime: '09:00', endTime: '12:00', isAvailable: true }
    ],
    saturday: [],
    sunday: []
  });

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const addTimeSlot = () => {
    const newSlot = {
      id: Date.now(),
      startTime: '09:00',
      endTime: '10:00',
      isAvailable: true
    };
    setSchedule({
      ...schedule,
      [selectedDay]: [...schedule[selectedDay as keyof typeof schedule], newSlot]
    });
    setEditingSlot(newSlot);
    setIsEditing(true);
  };

  const updateTimeSlot = (slotId: number, updates: any) => {
    setSchedule({
      ...schedule,
      [selectedDay]: schedule[selectedDay as keyof typeof schedule].map(slot =>
        slot.id === slotId ? { ...slot, ...updates } : slot
      )
    });
  };

  const deleteTimeSlot = (slotId: number) => {
    setSchedule({
      ...schedule,
      [selectedDay]: schedule[selectedDay as keyof typeof schedule].filter(slot => slot.id !== slotId)
    });
  };

  const saveSchedule = () => {
    // API call to save schedule
    console.log('Saving schedule:', schedule);
    setIsEditing(false);
    setEditingSlot(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Schedule
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your availability and working hours
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Days Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Days of Week
            </h3>
            <div className="space-y-2">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedDay === day.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{day.label}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {schedule[day.id as keyof typeof schedule].length} slots
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Management */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {days.find(d => d.id === selectedDay)?.label} Schedule
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={addTimeSlot}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Time Slot</span>
                  </button>
                  {isEditing && (
                    <button
                      onClick={saveSchedule}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              {schedule[selectedDay as keyof typeof schedule].length > 0 ? (
                <div className="space-y-4">
                  {schedule[selectedDay as keyof typeof schedule].map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      {editingSlot?.id === slot.id ? (
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateTimeSlot(slot.id, { startTime: e.target.value })}
                              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateTimeSlot(slot.id, { endTime: e.target.value })}
                              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                            />
                          </div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={slot.isAvailable}
                              onChange={(e) => updateTimeSlot(slot.id, { isAvailable: e.target.checked })}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">Available</span>
                          </label>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingSlot(null);
                                setIsEditing(false);
                              }}
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingSlot(null);
                                setIsEditing(false);
                              }}
                              className="p-1 text-gray-600 hover:text-gray-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-4">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {slot.startTime} - {slot.endTime}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              slot.isAvailable
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {slot.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingSlot(slot);
                                setIsEditing(true);
                              }}
                              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteTimeSlot(slot.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No time slots scheduled
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Add your first time slot to start accepting appointments on {days.find(d => d.id === selectedDay)?.label}.
                  </p>
                  <button
                    onClick={addTimeSlot}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Time Slot</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-white">Copy Schedule</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Copy this day's schedule to other days
                </p>
              </button>
              <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-white">Block Time</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Block specific dates for vacation or breaks
                </p>
              </button>
              <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-white">Set Rates</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Configure consultation fees for different types
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}