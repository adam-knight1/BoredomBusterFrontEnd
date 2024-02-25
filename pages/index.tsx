import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-24 text-primary">
      <h1 className="text-5xl font-bold mb-6">Welcome to the Boredom Buster App</h1>
      <p className="text-lg text-gray-500 mb-8">Discover interesting facts about dogs and more!</p>
      <div className="space-x-4">
        <Link href="/dog-facts" className="inline-block rounded bg-accent px-6 py-3 text-lg font-semibold text-white transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
          Dog Facts
        </Link>
        <Link href="/dog-facts" className="inline-block rounded bg-accent px-6 py-3 text-lg font-semibold text-white transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                  Trivia
        </Link>
        <Link href="/dog-facts" className="inline-block rounded bg-accent px-6 py-3 text-lg font-semibold text-white transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                   Local Weather
        </Link>
        {/* Other links go here */}
      </div>
      <div className="mt-10">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
