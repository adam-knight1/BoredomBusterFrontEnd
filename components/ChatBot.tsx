import React, { useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'; //backend running on 8080

    try {
      const response = await fetch(`${baseURL}/api/chat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response.text(); // read text first
        console.error('Error response:', errorData);
       }}
