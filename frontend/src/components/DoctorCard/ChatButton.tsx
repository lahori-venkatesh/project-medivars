import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { startChat } from '../../services/chat';
import { isAuthenticated } from '../../utils/auth';
import { toast } from 'sonner';

interface ChatButtonProps {
  doctorId: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function ChatButton({ doctorId, onClick }: ChatButtonProps) {
  const navigate = useNavigate();

  const handleChatClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(e);

    if (!isAuthenticated()) {
      toast.error('Please sign in to chat with doctors');
      return;
    }

    try {
      const threadId = await startChat(doctorId);
      navigate('/messages', { state: { threadId } });
    } catch (error) {
      toast.error('Failed to start chat');
    }
  };

  return (
    <button
      onClick={handleChatClick}
      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      title="Chat with doctor"
    >
      <MessageCircle className="w-5 h-5 text-blue-500" />
    </button>
  );
}