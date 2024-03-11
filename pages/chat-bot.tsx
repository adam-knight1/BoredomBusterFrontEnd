import React from 'react';
import ChatBot from '../components/ChatBot';
import Link from 'next/link';

const ChatBotPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-4 text-gray-800">
      <h1 className="text-5xl font-bold mb-6">Welcome to your personal AI assistant</h1>
      <ChatBot />
      <Link href="/" className="mt-6 text-blue-600 hover:underline">Back to Home</Link>
    </main>

  );
};

export default ChatBotPage;
