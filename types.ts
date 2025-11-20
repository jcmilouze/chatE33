export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}

export interface N8nResponse {
  output?: string; // Common n8n text output
  text?: string;   // Alternative output key
  response?: string;
  [key: string]: any;
}