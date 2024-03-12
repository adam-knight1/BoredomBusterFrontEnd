import React from 'react';
import ChatBot from '../components/ChatBot';
import Link from 'next/link';

const ChatBotPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 text-gray-800">
      <h1 className="text-5xl font-bold mb-6">Hello! My Name is Banjo, your personal AI assistant!</h1>
      <ChatBot />
      <Link href="/" className="mt-10 btn bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6">Back to Home</Link>
    </main>

  );
};

export default ChatBotPage;
