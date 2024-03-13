import React, { useState } from 'react';
import Link from 'next/link';

const categories = [
//creating an array that has the required api name and the grammatically correct display name for the UI
{ apiName: "music", displayName: "Music"}
{ apiName: "mathematics", displayName: "Mathematics"}
{ apiName: "" , displayName: ""}
{ apiName: "" , displayName: ""}
{ apiName: "" , displayName: ""}
{ apiName: "" , displayName: ""}

]

["music", "mathematics", "geography", "scienceNature", "general", "entertainment", "toysGames", "peoplePlaces"];

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


    //verifying the category select and constructing backend URL using env variable for deployed FE (or 8080 for development
  const fetchTriviaQuestion = async () => {
    if (selectedCategory === '') return;
    setLoading(true);
    setError('');
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';  //set env in vercel, this will make local dev easier
    try {
    //fetching the trivia from the 3rd party api
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
    //set up game logic for new round at category select
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setScore(0);
    setQuestionCount(0);
    setUserAnswer('');
    setQuestion('');
    setCorrectAnswer('');
    fetchTriviaQuestion();
  };
    //logic for incrementing game value.  Need to debug toLowerCase as it doesn't seem to be working currently.
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mb-6">
      {/* category selection buttons */}
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategorySelect(category)}
            className="btn bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6">
            {category}
          </button>
        ))}
      </div>
      {/* Q and A form here */}
      {question && (
      //submit logic
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

<Link href="/" className="mt-6 text-indigo-800 hover:underline">Back to home</Link>
   </div>
  );
};

export default TriviaGame;
