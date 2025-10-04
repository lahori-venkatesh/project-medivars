import React from 'react';
import { X, MapPin, Phone, Mail, Calendar, Clock, FileText, Check, AlertCircle } from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: any;
  onClose: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onRequestInfo: (message: string) => void;
}

export function DoctorProfileModal({
  doctor,
  onClose,
  onApprove,
  onReject,
  onRequestInfo
}: DoctorProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Doctor Profile Review</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="font-medium">{doctor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                <p className="font-medium">{doctor.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                <p className="font-medium">{doctor.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium">{doctor.location}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Verification Documents</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Medical License</p>
                    <p className="text-sm text-gray-500">{doctor.documents.license}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">View</button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">ID Proof</p>
                    <p className="text-sm text-gray-500">{doctor.documents.idProof}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">View</button>
              </div>

              {doctor.documents.addressProof && (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">Address Proof</p>
                      <p className="text-sm text-gray-500">{doctor.documents.addressProof}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6 flex justify-end gap-4">
            <button
              onClick={() => onReject('Documentation incomplete')}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Reject
            </button>
            <button
              onClick={() => onRequestInfo('Please provide additional documentation')}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Request Info
            </button>
            <button
              onClick={onApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Approve Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}