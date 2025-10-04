import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ChatList } from '../components/chat/ChatList';
import { useChat } from '../hooks/useChat';
import { getDoctorsMap, deleteChat } from '../services/chat';
import { toast } from 'sonner';

export function MessagesPage() {
  const location = useLocation();
  const [selectedThread, setSelectedThread] = useState<string | null>(
    location.state?.threadId || null
  );
  const doctorsMap = getDoctorsMap();
  
  const selectedDoctorId = selectedThread?.split('-')[1];
  const { messages, threads, sendMessage, loading, refreshThreads } = useChat(selectedDoctorId);

  useEffect(() => {
    if (location.state?.threadId) {
      setSelectedThread(location.state.threadId);
    }
  }, [location.state]);

  const handleSendMessage = async (content: string, file?: File) => {
    if (!selectedDoctorId) return;

    try {
      await sendMessage(content, file);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedThread) return;

    try {
      await deleteChat(selectedThread);
      await refreshThreads();
      setSelectedThread(null);
      toast.success('Chat deleted successfully');
    } catch (error) {
      toast.error('Failed to delete chat');
    }
  };

  if (threads.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Messages</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">No messages yet</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Start a conversation with a doctor by clicking the chat icon on their profile
          </p>
        </div>
      </div>
    );
  }

  const selectedDoctor = selectedDoctorId ? doctorsMap[selectedDoctorId] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <ChatList
            threads={threads}
            doctors={doctorsMap}
            onSelectThread={setSelectedThread}
            selectedThreadId={selectedThread || undefined}
          />
        </div>
        
        <div className="md:col-span-2">
          {selectedThread && selectedDoctor ? (
            <ChatWindow
              doctorId={selectedDoctorId!}
              doctorName={selectedDoctor.name}
              doctorImage={selectedDoctor.image}
              messages={messages}
              onSendMessage={handleSendMessage}
              onDeleteChat={handleDeleteChat}
              threadId={selectedThread}
            />
          ) : (
            <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}