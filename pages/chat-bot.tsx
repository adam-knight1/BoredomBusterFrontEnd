import React from 'react';
import ChatBot from '../components/ChatBot';
import Link from 'next/link';

const ChatBotPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
      <h1 className="text-5xl font-bold mb-6">Welcome to your personal AI assistant</h1>
      <h1 className="text-lg text-gray-9600 mb-8">!</h1>
      <ChatBot />
      <Link href="/" className="mt-6 text-blue-600 hover:underline">Back to Home</Link>
    </main>
  );
};

export default ChatBotPage;
