
import { Chat } from "@google/genai";

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export enum MessageSender {
  USER = 'user',
  CONTACT = 'contact',
  AI = 'ai',
  SYSTEM = 'system' // For system messages like errors
}

export interface Message {
  id: string;
  senderId: string; // Corresponds to User.id, or MessageSender.AI/MessageSender.USER
  senderType: MessageSender;
  text: string;
  timestamp: number;
}

export interface Contact extends User {
  isAi?: boolean;
}

export interface ChatSession {
  contactId: string;
  messages: Message[];
  sherpaChatInstance?: Chat; // Stores the Sherpa Chat object for AI contacts
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: GroundingChunkWeb;
}