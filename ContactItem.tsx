
import React from 'react';
import { Contact } from '../types';
import Avatar from './Avatar';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelectContact: (contactId: string) => void;
  lastMessage?: string; 
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onSelectContact, lastMessage }) => {
  return (
    <div
      onClick={() => onSelectContact(contact.id)}
      className={`flex items-center p-3 hover:bg-gray-200 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-100 border-r-4 border-blue-500' : 'border-r-4 border-transparent'
      }`}
    >
      <Avatar src={contact.avatarUrl} name={contact.name} size="md" />
      <div className="ml-3 flex-grow overflow-hidden">
        <p className={`font-semibold text-gray-800 ${isSelected ? 'text-blue-700' : ''}`}>{contact.name}</p>
        {contact.isAi && <p className="text-xs text-blue-500">AI Assistant</p>}
        {lastMessage && !contact.isAi && <p className="text-xs text-gray-500 truncate">{lastMessage}</p>}
      </div>
    </div>
  );
};

export default ContactItem;
