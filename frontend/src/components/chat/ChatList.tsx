import React from 'react';
import { ChatThread } from '../../types/chat';
import { formatDisplayDate } from '../../utils/date';

interface ChatListProps {
  threads: ChatThread[];
  doctors: Record<string, { name: string; image: string }>;
  onSelectThread: (threadId: string) => void;
  selectedThreadId?: string;
}

export function ChatList({ threads, doctors, onSelectThread, selectedThreadId }: ChatListProps) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {threads.map((thread) => {
        // Get the doctor ID from the thread ID (format: userId-doctorId)
        const doctorId = thread.id.split('-')[1];
        const doctor = doctors[doctorId];
        
        if (!doctor) return null;
        
        return (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              selectedThreadId === thread.id ? 'bg-blue-50 dark:bg-blue-900/50' : ''
            }`}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900 dark:text-white">{doctor.name}</h3>
              {thread.lastMessage && (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {thread.lastMessage.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDisplayDate(thread.lastMessage.timestamp)}
                  </p>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}