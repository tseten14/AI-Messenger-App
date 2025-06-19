
import React from 'react';
import { Contact, Message } from '../types';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
  chatSessions: Record<string, { messages: Message[] }>;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, selectedContactId, onSelectContact, chatSessions }) => {
  const getLastMessageText = (contactId: string): string | undefined => {
    const session = chatSessions[contactId];
    if (session && session.messages.length > 0) {
      return session.messages[session.messages.length - 1].text;
    }
    return undefined;
  };
  
  return (
    <div className="overflow-y-auto h-full">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          isSelected={selectedContactId === contact.id}
          onSelectContact={onSelectContact}
          lastMessage={contact.isAi ? undefined : getLastMessageText(contact.id)}
        />
      ))}
    </div>
  );
};

export default ContactList;
