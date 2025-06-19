
import React from 'react';
import { Contact, Message } from '../types';
import ContactList from './ContactList';

interface SidebarProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
  chatSessions: Record<string, { messages: Message[] }>;
}

const Sidebar: React.FC<SidebarProps> = ({ contacts, selectedContactId, onSelectContact, chatSessions }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 border-r border-gray-200 flex flex-col">
       <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">Chats</h2>
      </div>
      <ContactList 
        contacts={contacts} 
        selectedContactId={selectedContactId} 
        onSelectContact={onSelectContact}
        chatSessions={chatSessions}
      />
    </div>
  );
};

export default Sidebar;
