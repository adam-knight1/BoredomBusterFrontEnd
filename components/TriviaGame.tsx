import React, { useState } from 'react';
import Link from 'next/link';

const categories = ["music", "mathematics", "geography", "scienceNature", "general", "entertainment", "toysGames", "peoplePlaces"];

//similar to dogFacts implementation, should work as is for now, needs a few tweaks like not being so strict with answer format
const TriviaGame = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTriviaQuestion = async () => {
    if (selectedCategory === '') return;
    setLoading(true);
    setError('');
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';  //set env in vercel, this will make local dev easier
    try {
      const response = await fetch(`${backendBaseUrl}/api/trivia/question?category=${encodeURIComponent(selectedCategory)}`);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const data = await response.json();
      setQuestion(data.question);
      setCorrectAnswer(data.answer);
      setQuestionCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch trivia question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setScore(0);
    setQuestionCount(0);
    setUserAnswer('');
    setQuestion('');
    setCorrectAnswer('');
    fetchTriviaQuestion();
  };

  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) { //not working as of current 3.11
      setScore((prevScore) => prevScore + 1);
      alert('Correct!');
    } else {
      alert(`Incorrect! The correct answer was: ${correctAnswer}`);
    }
    setUserAnswer('');
    if (questionCount < 10) {
      fetchTriviaQuestion();
    } else {
      alert(`Game over! Your score was: ${score}`);
      setSelectedCategory(''); // Reset the category to allow for another choice, it allows mid game as well if you click twice
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      {/* category selection buttons */}
      <div className="flex justify-center mb-6">
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategorySelect(category)}
            className="btn mx-1 bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6">
            {category}
          </button>
        ))}
      </div>
      {/* Q and A form here */}
      {question && (
        <form onSubmit={handleSubmitAnswer} className="w-full max-w-md flex flex-col items-center gap-3">
          <div className="mb-4">
            <p className="text-xl">{question}</p>
            <input type="text" value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="input input-bordered input-primary w-full max-w-xs mt-2" />
          </div>
          <button type="submit" disabled={loading}
            className="btn bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6">
            Submit Answer
          </button>
        </form>
      )}
      {/* loading + error messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {/* game progress + score */}
      {!loading && !error && (
        <div className="mt-4">
          <p>Question: {questionCount} of 10</p>
          <p>Score: {score}</p>
        </div>
      )}

<Link href="/">
  <a className="mt-6 text-indigo-800 hover:underline">Back to home</a>
</Link>
    </div>
  );
};

export default TriviaGame;
