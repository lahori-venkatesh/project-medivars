import React from 'react';
import { Message } from '../../types/chat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { DeleteChatButton } from './DeleteChatButton';
import { useChat } from '../../hooks/useChat';
import { toast } from 'sonner';

interface ChatWindowProps {
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  messages: Message[];
  onSendMessage: (content: string, file?: File) => void;
  onDeleteChat: () => void;
  threadId: string;
}

export function ChatWindow({
  doctorId,
  doctorName,
  doctorImage,
  messages,
  onSendMessage,
  onDeleteChat,
  threadId
}: ChatWindowProps) {
  const { deleteMessage, editMessage } = useChat(doctorId);

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    try {
      await editMessage(messageId, newContent);
      toast.success('Message updated');
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <ChatHeader doctorName={doctorName} doctorImage={doctorImage} />
        <DeleteChatButton onDelete={onDeleteChat} threadId={threadId} />
      </div>
      <MessageList 
        messages={messages} 
        onDeleteMessage={handleDeleteMessage}
        onEditMessage={handleEditMessage}
      />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}