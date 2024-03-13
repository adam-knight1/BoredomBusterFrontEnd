import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


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
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">Dog Facts</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center gap-3">
          <input
            type="text"
            value={breedName}
            onChange={(e) => setBreedName(e.target.value)}
            placeholder="Enter dog breed"
            className="input input-bordered input-primary w-full rounded-full" // Rounded-full for bubbly input
            style={{ padding: '10px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          />
          <button
            type="submit"
            className="btn bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6" // Rounded-full for bubbly button
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            Get Facts
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {dog && (
          <div
            className="mt-4 p-4 w-full max-w-lg bg-white rounded-3xl text-center" // Rounded-3xl for bubbly box
            style={{ boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)' }}
          >
            <h2 className="text-lg font-semibold">{dog.name}</h2>
           {dog.imageLink && (
                       <div className="mx-auto w-48 h-auto rounded-full overflow-hidden">
                         <Image
                           src={dog.imageLink}
                           alt={dog.name}
                           width={192}
                           height={108}
                           objectFit="cover"
                         />
                       </div>
                     )}

            <p>Grooming: {dog.grooming}</p>
            <p>Good with children: {dog.goodWithChildren > 1 ? 'Yes' : 'No'}</p>
            <p>Good with other dogs: {dog.goodWithOtherDogs > 1 ? 'Yes' : 'No'}</p>
            <p>Shedding level: {dog.shedding}</p>
            <p>Energy level: {dog.energy}</p>
            <p>Trainability: {dog.trainability}</p>
            <p>Life expectancy: {dog.minLifeExpectancy ? dog.minLifeExpectancy : 'Unknown'}-{dog.maxLifeExpectancy ? dog.maxLifeExpectancy : 'Unknown'} years</p>
          </div>
        )}
        <Link href="/" className="mt-8 btn bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6">Back to home</Link>
      </div>
    );

  };

export default DogFacts;
