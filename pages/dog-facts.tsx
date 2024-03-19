import React from 'react';
import DogFacts from '../components/DogFacts';

const DogFactsPage: React.FC = () => {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
        <h1 className="text-5xl font-bold mb-6">Welcome to the Dog Facts Page</h1>
        <p className="text-lg text-gray-500 mb-8">Discover various data points related to individual dog breeds!</p>
        <div className="space-x-4">
          {/* additional logic in DogFacts.tsx */}
        </div>
        <div className="mt-10">
          <DogFacts />
        </div>
      </main>
    );
  };

export default DogFactsPage;

