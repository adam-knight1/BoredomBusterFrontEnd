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
        alert(`Error sending message: ${errorData}`);
        throw new Error('Failed to fetch response from API');
      }

      const data = await response.json();
      const botResponse: ChatMessage = {
        role: 'assistant',
        content: data.choices[0].message.content, //grabbing the first one for now
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "Sorry, I couldn't process your request." }
      ]);
    }

    setInput(''); // Clearing the input field
  };


  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block rounded-lg p-2 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How can I help?"
          className="w-full p-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          autoComplete="on"
        />
      </form>
    </div>
  );
};

export default ChatBot;
