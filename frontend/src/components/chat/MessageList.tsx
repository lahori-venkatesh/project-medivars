import React, { useRef, useEffect, useState } from 'react';
import { Message } from '../../types/chat';
import { getUser } from '../../utils/auth';
import { formatDisplayDate } from '../../utils/date';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  onDeleteMessage: (messageId: string) => void;
  onEditMessage: (messageId: string, newContent: string) => void;
}

export function MessageList({ messages, onDeleteMessage, onEditMessage }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getUser();
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [activeMessageMenu, setActiveMessageMenu] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEdit = (message: Message) => {
    setEditingMessageId(message.id);
    setEditContent(message.content);
    setActiveMessageMenu(null);
  };

  const handleSaveEdit = (messageId: string) => {
    onEditMessage(messageId, editContent);
    setEditingMessageId(null);
    setEditContent('');
  };

  const handleDelete = (messageId: string) => {
    onDeleteMessage(messageId);
    setActiveMessageMenu(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUser?.id;
        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 relative group ${
                isCurrentUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {isCurrentUser && (
                <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setActiveMessageMenu(activeMessageMenu === message.id ? null : message.id)}
                    className="p-1 hover:bg-blue-700 rounded"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {activeMessageMenu === message.id && (
                    <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg py-1 z-10">
                      <button
                        onClick={() => handleEdit(message)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              {editingMessageId === message.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 rounded border text-gray-900"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingMessageId(null)}
                      className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(message.id)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {message.imageUrl && (
                    <img
                      src={message.imageUrl}
                      alt="Shared image"
                      className="max-w-full rounded-lg mb-2"
                    />
                  )}
                  {message.content && <p>{message.content}</p>}
                  <p className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatDisplayDate(message.timestamp)}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}