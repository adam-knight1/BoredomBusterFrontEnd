// ChatBot.tsx
// This component implements a chat interface where users can interact with an AI assistant.
// It captures user input, sends it to the AI backend, and displays the AI's response.

import React, { useState } from 'react';

// Defining the structure for chat messages
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]); // State to keep track of conversation
  const [input, setInput] = useState(''); // State for user's input

      // Function to handle sending messages
  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Adding user's message to messages array
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Set base URL from environment or fallback to localhost
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'; //backend running on 8080

    try {
      // Sending the message to the backend API
      const response = await fetch(`${baseURL}/api/chat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      // Checking for successful response
      if (!response.ok) {
        const errorData = await response.text(); // read text first
        console.error('Error response:', errorData);
        alert(`Error sending message: ${errorData}`);
        throw new Error('Failed to fetch response from API');
      }

    // Parsing JSON response and adding AI's response to the messages array
      const data = await response.json();
      const botResponse: ChatMessage = {
        role: 'assistant',
        content: data.choices[0].message.content, //grabbing the first one for now
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
       // Provide feedback in case of error
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "Sorry, I couldn't process your request." }
      ]);
    }

    setInput(''); // Clearing the input field
  };

    // Rendering the chat interface
    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <div className="mb-4 space-y-2 overflow-y-auto max-h-80 scroll-smooth" style={{ maxHeight: '50vh' }}>
              {/* Map through messages and displaying them */}
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block rounded-lg p-2 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {msg.content}
                  </span>
                </div>
              ))}

          </div>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help?"
              className="flex-grow p-4 rounded-l-full border-2 border-r-0 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-r-full p-4 hover:bg-blue-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </form>
        </div>
      );
  };

export default ChatBot;
