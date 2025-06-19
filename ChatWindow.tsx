
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

interface ChatWindowProps {
  messages: Message[];
  isLoadingAiResponse?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoadingAiResponse }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingAiResponse]);

  return (
    <div className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoadingAiResponse && (
        <div className="flex justify-start mb-3">
            <div className="rounded-lg py-2 px-3 max-w-xs md:max-w-md lg:max-w-lg bg-gray-200 text-gray-800">
                <LoadingSpinner size="sm" color="text-gray-600" />
            </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
