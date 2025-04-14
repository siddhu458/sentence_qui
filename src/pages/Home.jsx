import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/quiz', { state: { difficulty } });
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-2xl animate-fade-in-up">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 dark:text-blue-400">🧠 Sentence Quiz</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Welcome!</h2>

        <p className="text-md sm:text-lg max-w-xl mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          Test your ability to form meaningful English sentences by placing the correct words into blanks.
          <br />
          You have <strong className="text-blue-600 dark:text-blue-400">30 seconds</strong> per question.
          <br />
          <span className="text-red-500 font-semibold">NOTE:</span> Don’t refresh the page — you’ll lose your progress.
        </p>

        {/* Difficulty Selector */}
        <div className="mb-6 text-left">
          <label className="block text-md font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Select Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={loading}
          className={`w-full px-6 py-3 text-lg font-bold rounded-xl transition duration-300 transform ${
            loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-lg text-white'
          }`}
        >
          {loading ? 'Loading...' : '🚀 Start Quiz'}
        </button>
      </div>
    </div>
  );
}
