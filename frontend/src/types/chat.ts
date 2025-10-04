export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  imageUrl?: string;
}

export interface ChatThread {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}