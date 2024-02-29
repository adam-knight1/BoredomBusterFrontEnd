import React from 'react';
import WeatherData from '../components/WeatherData';

const WeatherDataPage: React.FC = () => {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
        <h1 className="text-5xl font-bold mb-6">Welcome to the Weather Data Page</h1>
        <p className="text-lg text-gray-500 mb-8">Search For Weather Anywhere in the world By Zip Code or City/State</p>
        <div className="space-x-4">
          {/* additional logic in WeatherFacts.tsx */}
        </div>
        <div className="mt-10">
          <DogFacts />
        </div>
      </main>
    );
  };


export default WeatherDataPage;
