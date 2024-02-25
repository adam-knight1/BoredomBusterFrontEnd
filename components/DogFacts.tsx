import React, { useState } from 'react';
import Link from 'next/link';


interface DogInfo {
  name: string;
  imageLink: string;
  grooming: string;
  goodWithChildren: number;
  goodWithOtherDogs: number;
  shedding: number;
  energy: number;
  trainability: number;
  minLifeExpectancy: number;
  maxLifeExpectancy: number;
}

const DogFacts = () => {
  const [breedName, setBreedName] = useState<string>('');
  const [dog, setDog] = useState<DogInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchDogInfo = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    try {
      const response = await fetch(`${backendBaseUrl}/api/dogs/dog?breedName=${encodeURIComponent(breedName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers if I need them
        },
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const data: DogInfo = await response.json();
      setDog(data);
    } catch (error: any) {
      console.error(error);
      setError('Failed to fetch dog information. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchDogInfo();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">Dog Facts</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={breedName}
          onChange={(e) => setBreedName(e.target.value)}
          placeholder="Enter dog breed"
          className="mt-4 input input-bordered input-primary w-full max-w-xs"
        />
        <button type="submit" className="inline-block mt-4 rounded bg-accent px-3 py-1 text-lg font-semibold text-white transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
          Get Facts
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {dog && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{dog.name}</h2>
          <img src={dog.imageLink} alt={dog.name} className="w-full max-w-sm" />
          {/* Display other dog details here */}
          <p>Grooming: {dog.grooming}</p>
          <p>Good with children: {dog.goodWithChildren ? 'Yes' : 'No'}</p>
          <p>Good with other dogs: {dog.goodWithOtherDogs ? 'Yes' : 'No'}</p>
          <p>Shedding level: {dog.shedding}</p>
          <p>Energy level: {dog.energy}</p>
          <p>Trainability: {dog.trainability}</p>
          <p>Life expectancy: {dog.minLifeExpectancy}-{dog.maxLifeExpectancy} years</p>
        </div>
      )}
        <Link href="/" className="text-indigo-800 hover:underline">Back to home</Link>
    </div>
  );
};

export default DogFacts;
