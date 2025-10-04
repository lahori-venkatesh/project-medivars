import { useState, useEffect } from 'react';
import { Message, ChatThread } from '../types/chat';
import { 
  getMessages, 
  sendMessage as sendMessageApi, 
  getChatThreads,
  deleteMessage as deleteMessageApi,
  editMessage as editMessageApi
} from '../services/chat';

export function useChat(doctorId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (doctorId) {
      loadMessages(doctorId);
    }
    loadThreads();
  }, [doctorId]);

  const loadMessages = async (id: string) => {
    try {
      setLoading(true);
      const chatMessages = await getMessages(id);
      setMessages(chatMessages);
      setError(null);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const loadThreads = async () => {
    try {
      const chatThreads = await getChatThreads();
      setThreads(chatThreads);
    } catch (err) {
      setError('Failed to load chat threads');
    }
  };

  const handleSendMessage = async (content: string, file?: File) => {
    if (!doctorId) return;

    try {
      const message = await sendMessageApi(doctorId, content, file);
      setMessages(prev => [...prev, message]);
      await loadThreads();
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessageApi(messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      await loadThreads();
    } catch (err) {
      throw new Error('Failed to delete message');
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    try {
      const updatedMessage = await editMessageApi(messageId, newContent);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? updatedMessage : msg
      ));
      await loadThreads();
    } catch (err) {
      throw new Error('Failed to edit message');
    }
  };

  return {
    messages,
    threads,
    loading,
    error,
    sendMessage: handleSendMessage,
    deleteMessage: handleDeleteMessage,
    editMessage: handleEditMessage,
    refreshThreads: loadThreads
  };
}