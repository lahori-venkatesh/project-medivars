import { getUser } from '../utils/auth';
import { Message, ChatThread } from '../types/chat';
import { doctors } from '../data/doctors';

// Mock data storage
let mockMessages: Message[] = [];
let mockThreads: ChatThread[] = [];

export async function startChat(doctorId: string): Promise<string> {
  const user = getUser();
  if (!user) throw new Error('User not authenticated');

  const threadId = `${user.id}-${doctorId}`;
  const existingThread = mockThreads.find(t => t.id === threadId);
  
  if (existingThread) {
    return threadId;
  }

  const newThread: ChatThread = {
    id: threadId,
    participants: [user.id, doctorId],
    updatedAt: new Date().toISOString()
  };

  mockThreads.push(newThread);
  return threadId;
}

export async function sendMessage(
  doctorId: string,
  content: string,
  file?: File
): Promise<Message> {
  const user = getUser();
  if (!user) throw new Error('User not authenticated');

  let imageUrl: string | undefined;
  if (file) {
    imageUrl = URL.createObjectURL(file);
  }

  const message: Message = {
    id: Date.now().toString(),
    senderId: user.id,
    receiverId: doctorId,
    content,
    imageUrl,
    timestamp: new Date().toISOString(),
    read: false
  };

  const threadId = `${user.id}-${doctorId}`;
  const existingThread = mockThreads.find(t => t.id === threadId);

  if (existingThread) {
    existingThread.lastMessage = message;
    existingThread.updatedAt = message.timestamp;
  } else {
    mockThreads.push({
      id: threadId,
      participants: [user.id, doctorId],
      lastMessage: message,
      updatedAt: message.timestamp
    });
  }

  mockMessages.push(message);
  return message;
}

export async function getMessages(doctorId: string): Promise<Message[]> {
  const user = getUser();
  if (!user) throw new Error('User not authenticated');

  return mockMessages.filter(
    msg => 
      (msg.senderId === user.id && msg.receiverId === doctorId) ||
      (msg.senderId === doctorId && msg.receiverId === user.id)
  );
}

export async function getChatThreads(): Promise<ChatThread[]> {
  const user = getUser();
  if (!user) throw new Error('User not authenticated');

  return mockThreads
    .filter(thread => thread.participants.includes(user.id))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function deleteChat(threadId: string): Promise<void> {
  const user = getUser();
  if (!user) throw new Error('User not authenticated');

  mockThreads = mockThreads.filter(thread => thread.id !== threadId);

  const [userId, doctorId] = threadId.split('-');
  mockMessages = mockMessages.filter(
    msg => !(
      (msg.senderId === userId && msg.receiverId === doctorId) ||
      (msg.senderId === doctorId && msg.receiverId === userId)
    )
  );
}

export async function deleteMessage(messageId: string): Promise<void> {
  mockMessages = mockMessages.filter(msg => msg.id !== messageId);
  
  mockThreads = mockThreads.map(thread => {
    if (thread.lastMessage?.id === messageId) {
      const messages = mockMessages.filter(msg => 
        msg.senderId === thread.participants[0] || 
        msg.senderId === thread.participants[1]
      );
      const lastMessage = messages[messages.length - 1];
      return {
        ...thread,
        lastMessage,
        updatedAt: lastMessage?.timestamp || thread.updatedAt
      };
    }
    return thread;
  });
}

export async function editMessage(messageId: string, newContent: string): Promise<Message> {
  const messageIndex = mockMessages.findIndex(msg => msg.id === messageId);
  if (messageIndex === -1) throw new Error('Message not found');

  const updatedMessage = {
    ...mockMessages[messageIndex],
    content: newContent,
    edited: true
  };

  mockMessages[messageIndex] = updatedMessage;

  mockThreads = mockThreads.map(thread => {
    if (thread.lastMessage?.id === messageId) {
      return {
        ...thread,
        lastMessage: updatedMessage
      };
    }
    return thread;
  });

  return updatedMessage;
}

// Helper to get doctor info for chat UI
export function getDoctorsMap() {
  return doctors.reduce((acc, doctor) => ({
    ...acc,
    [doctor.id]: {
      name: doctor.name,
      image: doctor.image
    }
  }), {} as Record<string, { name: string; image: string }>);
}