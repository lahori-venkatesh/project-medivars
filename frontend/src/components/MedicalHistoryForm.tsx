import React, { useState } from 'react';
import { MedicalHistory, Medication } from '../types';

interface MedicalHistoryFormProps {
  initialData?: MedicalHistory;
  onSave: (data: MedicalHistory) => void;
}

export function MedicalHistoryForm({ initialData, onSave }: MedicalHistoryFormProps) {
  const [allergies, setAllergies] = useState(initialData?.allergies || []);
  const [medications, setMedications] = useState<Medication[]>(initialData?.medications || []);
  const [conditions, setConditions] = useState(initialData?.conditions || []);
  const [bloodGroup, setBloodGroup] = useState(initialData?.bloodGroup || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      allergies,
      medications,
      conditions,
      bloodGroup,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Blood Group</label>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        <input
          type="text"
          placeholder="Add allergies (comma separated)"
          value={allergies.join(', ')}
          onChange={(e) => setAllergies(e.target.value.split(',').map(s => s.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
        <input
          type="text"
          placeholder="Add conditions (comma separated)"
          value={conditions.join(', ')}
          onChange={(e) => setConditions(e.target.value.split(',').map(s => s.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Medications</label>
        {medications.map((med, index) => (
          <div key={index} className="mt-2 grid grid-cols-3 gap-2">
            <input
              type="text"
              value={med.name}
              onChange={(e) => {
                const newMeds = [...medications];
                newMeds[index] = { ...med, name: e.target.value };
                setMedications(newMeds);
              }}
              placeholder="Medication name"
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="text"
              value={med.dosage}
              onChange={(e) => {
                const newMeds = [...medications];
                newMeds[index] = { ...med, dosage: e.target.value };
                setMedications(newMeds);
              }}
              placeholder="Dosage"
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="text"
              value={med.frequency}
              onChange={(e) => {
                const newMeds = [...medications];
                newMeds[index] = { ...med, frequency: e.target.value };
                setMedications(newMeds);
              }}
              placeholder="Frequency"
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setMedications([...medications, { name: '', dosage: '', frequency: '', startDate: new Date().toISOString() }])}
          className="mt-2 text-sm text-blue-600 hover:text-blue-500"
        >
          + Add Medication
        </button>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Medical History
      </button>
    </form>
  );
}