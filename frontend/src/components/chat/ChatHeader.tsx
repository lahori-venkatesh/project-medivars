import React from 'react';

interface ChatHeaderProps {
  doctorName: string;
  doctorImage: string;
  isOnline?: boolean;
}

export function ChatHeader({ doctorName, doctorImage, isOnline = true }: ChatHeaderProps) {
  return (
    <div className="flex items-center p-4 border-b">
      <img src={doctorImage} alt={doctorName} className="w-10 h-10 rounded-full" />
      <div className="ml-3">
        <h3 className="font-medium">{doctorName}</h3>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
          <p className="text-sm text-gray-500 ml-1">{isOnline ? 'Online' : 'Offline'}</p>
        </div>
      </div>
    </div>
  );
}