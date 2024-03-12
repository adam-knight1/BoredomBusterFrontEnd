import React from 'react';
import TriviaGame from '../components/TriviaGame';

const TriviaPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
      <h1 className="text-5xl font-bold mb-6">Trivia Showdown</h1>
      <p className="text-lg text-gray-500 mb-8">Select a category below to get started!</p>
      <TriviaGame />
    </main>
  );
};

export default TriviaPage;
