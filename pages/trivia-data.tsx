import React from 'react';
import TriviaGame from '../components/TriviaGame';

const TriviaPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
      <h1 className="text-5xl font-bold mb-6">Welcome to the Trivia Game</h1>
      <p className="text-lg text-gray-500 mb-8">Test your knowledge across various categories!</p>
      <TriviaGame />
    </main>
  );
};

export default TriviaPage;
