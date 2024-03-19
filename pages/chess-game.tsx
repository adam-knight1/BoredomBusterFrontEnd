import React from 'react';
import ChessGame from '../components/ChessGame';

const ChessGamePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
      <h1 className="text-5xl font-bold mb-6">Let's Play Chess</h1>
        <p className="text-lg text-gray-500 mb-8">See if you can beat the AI&apos;!</p>
      <div className="mt-10">
        <ChessGame />
      </div>
    </main>
  );
};

export default ChessGamePage;
