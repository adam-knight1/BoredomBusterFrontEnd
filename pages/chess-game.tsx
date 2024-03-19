import React from 'react';
import ChessGame from '../components/ChessGame';

const ChessGamePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
     <h1 className="text-5xl font-bold mb-6">I Challenge You to Chess!</h1>
     <p className="text-lg text-gray-500 mb-8"> Good Luck! </p>
     <ChessGame />
    </main>
  );
};

export default ChessGamePage;
