
import { Contact } from './types';

export const CURRENT_USER_ID = 'currentUser';

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'sherpa-assistant',
    name: 'Sherpa Assistant',
    avatarUrl: 'https://picsum.photos/seed/ai/100/100', // Consider changing seed if a new avatar is desired
    isAi: true,
  },
  {
    id: 'alice',
    name: 'Alice Wonderland',
    avatarUrl: 'https://picsum.photos/seed/alice/100/100',
    isAi: false,
  },
  {
    id: 'bob',
    name: 'Bob The Builder',
    avatarUrl: 'https://picsum.photos/seed/bob/100/100',
    isAi: false,
  },
];

export const SHERPA_MODEL_NAME = 'gemini-2.5-flash-preview-04-17'; // Model name remains the same as per Gemini guidelines
export const SHERPA_CHAT_SYSTEM_INSTRUCTION = 'You are a helpful and friendly AI assistant in a chat application named Sherpa. Keep your responses concise and conversational.';