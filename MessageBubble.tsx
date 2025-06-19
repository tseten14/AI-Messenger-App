
import React from 'react';
import { Message, MessageSender } from '../types';
import { CURRENT_USER_ID } from '../constants';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isCurrentUser = message.senderId === CURRENT_USER_ID;
  const isSystemMessage = message.senderType === MessageSender.SYSTEM;

  if (isSystemMessage) {
    return (
      <div className="py-2 px-3 text-center">
        <p className="text-xs text-gray-500 italic">{message.text}</p>
      </div>
    );
  }

  return (
    <div className={`flex mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-lg py-2 px-3 max-w-xs md:max-w-md lg:max-w-lg break-words ${
          isCurrentUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'} text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
