import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data - replace with API calls
  const conversations = [
    {
      id: 1,
      patient: {
        name: 'Sarah Johnson',
        avatar: null,
        lastSeen: '2 min ago'
      },
      lastMessage: 'Thank you for the consultation, Doctor.',
      timestamp: '10:30 AM',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'Hello Dr. Smith, I have a question about my medication.',
          timestamp: '10:15 AM'
        },
        {
          id: 2,
          sender: 'doctor',
          content: 'Hello Sarah! I\'d be happy to help. What\'s your question?',
          timestamp: '10:18 AM'
        },
        {
          id: 3,
          sender: 'patient',
          content: 'Should I take the medication with food?',
          timestamp: '10:20 AM'
        },
        {
          id: 4,
          sender: 'doctor',
          content: 'Yes, it\'s best to take it with food to avoid stomach upset.',
          timestamp: '10:22 AM'
        },
        {
          id: 5,
          sender: 'patient',
          content: 'Thank you for the consultation, Doctor.',
          timestamp: '10:30 AM'
        }
      ]
    },
    {
      id: 2,
      patient: {
        name: 'Michael Chen',
        avatar: null,
        lastSeen: '1 hour ago'
      },
      lastMessage: 'When should I schedule my follow-up?',
      timestamp: '9:45 AM',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'Good morning Doctor, how are you?',
          timestamp: '9:30 AM'
        },
        {
          id: 2,
          sender: 'patient',
          content: 'When should I schedule my follow-up?',
          timestamp: '9:45 AM'
        }
      ]
    },
    {
      id: 3,
      patient: {
        name: 'Emily Davis',
        avatar: null,
        lastSeen: '3 hours ago'
      },
      lastMessage: 'The symptoms have improved significantly.',
      timestamp: 'Yesterday',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'The symptoms have improved significantly.',
          timestamp: 'Yesterday 4:20 PM'
        }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Add message to conversation
      const updatedConversation = {
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          {
            id: Date.now(),
            sender: 'doctor',
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setSelectedConversation(updatedConversation);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Communicate with your patients securely
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-full">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                        {conversation.patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {conversation.patient.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.timestamp}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                          {selectedConversation.patient.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {selectedConversation.patient.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last seen {selectedConversation.patient.lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'doctor'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a patient from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}