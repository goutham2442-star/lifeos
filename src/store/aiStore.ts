import { create } from 'zustand';
import type { AIConversation } from '@/data/mockData';
import { aiResponses } from '@/data/mockData';

interface AIState {
  conversations: AIConversation[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearConversations: () => void;
}

function getMockResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  for (const key of Object.keys(aiResponses)) {
    if (lower.includes(key)) return aiResponses[key];
  }
  return "I understand you'd like help with that. I can plan your day, create reminders, summarize notes, continue projects, or give you an overview of today. What would you like to do?";
}

export const useAIStore = create<AIState>((set, get) => ({
  conversations: [],
  isTyping: false,
  sendMessage: (content) => {
    const userMsg: AIConversation = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({ conversations: [...s.conversations, userMsg], isTyping: true }));

    setTimeout(() => {
      const aiMsg: AIConversation = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: getMockResponse(content),
        timestamp: new Date().toISOString(),
      };
      set((s) => ({ conversations: [...s.conversations, aiMsg], isTyping: false }));
    }, 1200);
  },
  clearConversations: () => set({ conversations: [] }),
}));
