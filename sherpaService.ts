
import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import { SHERPA_MODEL_NAME, SHERPA_CHAT_SYSTEM_INSTRUCTION } from '../constants';
import { Message } from "../types";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY for Sherpa AI is not set. AI features will be limited.");
}

export const createAiChat = (): Chat | null => {
  if (!ai) return null;
  return ai.chats.create({
    model: SHERPA_MODEL_NAME,
    config: {
      systemInstruction: SHERPA_CHAT_SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageToAi = async (
  chatInstance: Chat,
  messageText: string
): Promise<{ text: string; error?: string }> => {
  if (!ai) {
    return { text: '', error: "Sherpa API key not configured. AI is unavailable." };
  }
  if (!chatInstance) {
    return { text: '', error: "AI chat session not initialized." };
  }

  try {
    const response: GenerateContentResponse = await chatInstance.sendMessage({ message: messageText });
    return { text: response.text };
  } catch (error) {
    console.error("Error sending message to Sherpa AI:", error);
    let errorMessage = "AI response error. Please try again.";
    if (error instanceof Error) {
        errorMessage = `AI Error: ${error.message}`;
    }
    return { text: '', error: errorMessage };
  }
};

export const generateSimpleAiResponse = async (prompt: string): Promise<{text: string; error?: string}> => {
  if (!ai) {
    return { text: '', error: "Sherpa API key not configured. AI is unavailable." };
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: SHERPA_MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SHERPA_CHAT_SYSTEM_INSTRUCTION,
      }
    });
    return { text: response.text };
  } catch (error) {
    console.error("Error generating simple Sherpa AI response:", error);
    let errorMessage = "AI response error. Please try again.";
    if (error instanceof Error) {
        errorMessage = `AI Error: ${error.message}`;
    }
    return { text: '', error: errorMessage };
  }
};