
import React from 'react';
import { Contact, Message } from '../types';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import Avatar from './Avatar';

interface ChatAreaProps {
  selectedContact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoadingAiResponse?: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedContact, messages, onSendMessage, isLoadingAiResponse }) => {
  if (!selectedContact) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-white text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-300 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25S3.75 16.556 3.75 12c0-4.556 3.86-8.25 8.625-8.25S21 7.444 21 12z" />
        </svg>
        <p className="text-lg">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-white">
      <div className="p-3 border-b border-gray-200 flex items-center bg-gray-50">
        <Avatar src={selectedContact.avatarUrl} name={selectedContact.name} size="md" />
        <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800">{selectedContact.name}</h3>
            {selectedContact.isAi && <p className="text-xs text-green-600">Online</p>}
        </div>
      </div>
      <ChatWindow messages={messages} isLoadingAiResponse={isLoadingAiResponse} />
      <MessageInput onSendMessage={onSendMessage} disabled={isLoadingAiResponse && selectedContact.isAi} />
    </div>
  );
};

export default ChatArea;
