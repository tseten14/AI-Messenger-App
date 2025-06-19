
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Header from './components/Header';
import { Contact, Message, ChatSession, MessageSender } from './types';
import { INITIAL_CONTACTS, CURRENT_USER_ID } from './constants';
import { createAiChat, sendMessageToAi } from './services/sherpaService'; // Updated import
import { Chat } from '@google/genai';

const App: React.FC = () => {
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [chatSessions, setChatSessions] = useState<Record<string, ChatSession>>(() => {
    const initialSessions: Record<string, ChatSession> = {};
    INITIAL_CONTACTS.forEach(contact => {
      initialSessions[contact.id] = {
        contactId: contact.id,
        messages: [],
        sherpaChatInstance: contact.isAi ? createAiChat() || undefined : undefined, // Updated property name
      };
      if (contact.isAi && !initialSessions[contact.id].sherpaChatInstance) { // Updated property name
          initialSessions[contact.id].messages.push({
              id: Date.now().toString(),
              senderId: MessageSender.SYSTEM,
              senderType: MessageSender.SYSTEM,
              text: "Sherpa AI Assistant could not be initialized. API key might be missing or invalid.", // Updated text
              timestamp: Date.now(),
          });
      }
    });
    return initialSessions;
  });
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);

  const handleSelectContact = useCallback((contactId: string) => {
    setSelectedContactId(contactId);
  }, []);

  const addMessageToSession = (contactId: string, message: Message) => {
    setChatSessions(prevSessions => ({
      ...prevSessions,
      [contactId]: {
        ...prevSessions[contactId],
        messages: [...prevSessions[contactId].messages, message],
      },
    }));
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (!selectedContactId) return;

    const currentUserMessage: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER_ID,
      senderType: MessageSender.USER,
      text,
      timestamp: Date.now(),
    };
    addMessageToSession(selectedContactId, currentUserMessage);

    const currentContact = contacts.find(c => c.id === selectedContactId);
    if (currentContact?.isAi) {
      const session = chatSessions[selectedContactId];
      if (session.sherpaChatInstance) { // Updated property name
        setIsLoadingAiResponse(true);
        const { text: aiText, error: aiError } = await sendMessageToAi(session.sherpaChatInstance, text); // Updated property name
        setIsLoadingAiResponse(false);
        
        const aiResponseMessage: Message = {
          id: (Date.now() + 1).toString(), 
          senderId: MessageSender.AI,
          senderType: MessageSender.AI,
          text: aiError ? `Error: ${aiError}` : aiText,
          timestamp: Date.now(),
        };
        addMessageToSession(selectedContactId, aiResponseMessage);
      } else {
         const errorResponseMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: MessageSender.SYSTEM,
          senderType: MessageSender.SYSTEM,
          text: "Sherpa AI chat is not available for this contact. Initialization failed.", // Updated text
          timestamp: Date.now(),
        };
        addMessageToSession(selectedContactId, errorResponseMessage);
      }
    } else {
      // Simulate a response from a non-AI contact for demo purposes
      setTimeout(() => {
        const contactResponseMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedContactId,
          senderType: MessageSender.CONTACT,
          text: `Hey! I received your message: "${text}". I'll reply later. (Simulated)`,
          timestamp: Date.now(),
        };
        addMessageToSession(selectedContactId, contactResponseMessage);
      }, 1000);
    }
  }, [selectedContactId, contacts, chatSessions]);


  const selectedContact = contacts.find(c => c.id === selectedContactId) || null;
  const currentMessages = selectedContactId ? chatSessions[selectedContactId]?.messages || [] : [];

  useEffect(() => {
    if (!selectedContactId && contacts.length > 0) {
        const firstContact = contacts[0];
        const firstSession = chatSessions[firstContact.id];
        if (!firstContact.isAi || 
            (firstSession && !firstSession.messages.some(m => m.senderType === MessageSender.SYSTEM && m.text.includes("could not be initialized")))) {
            setSelectedContactId(firstContact.id);
        }
    }
  }, [contacts, chatSessions, selectedContactId]); // Added selectedContactId to dependencies

  return (
    <div className="flex flex-col h-screen antialiased text-gray-800">
      <Header />
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Sidebar
          contacts={contacts}
          selectedContactId={selectedContactId}
          onSelectContact={handleSelectContact}
          chatSessions={chatSessions}
        />
        <ChatArea
          selectedContact={selectedContact}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          isLoadingAiResponse={isLoadingAiResponse && selectedContact?.isAi}
        />
      </div>
    </div>
  );
};

export default App;