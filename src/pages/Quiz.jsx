import { useEffect, useState } from 'react';
import { fetchQuestions } from '../utils/api';
import SentenceCard from '../components/SentenceCard';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const navigate = useNavigate();
  const [showQuitModal, setShowQuitModal] = useState(false);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    if (timeUp) {
      alert("⏰ TIME UP! Moving to next question");
      handleNext();
    }
  }, [timeUp]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[current] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setTimeUp(false);
    } else {
      navigate('/result', { state: { questions, answers } });
    }
  };

  if (questions.length === 0)
    return (
      <div className="p-4 text-center text-xl font-medium text-black dark:text-white bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl p-10 rounded-3xl shadow-2xl text-black dark:text-white transition-colors duration-300">

        {/* Timer & Question Count */}
        <div className="flex justify-between items-center mb-6">
          <Timer key={current} onTimeUp={() => setTimeUp(true)} />
          <div className="text-gray-500 dark:text-gray-300 font-medium">
            Question {current + 1} of {questions.length}
          </div>
          <button
            onClick={() => navigate('/quit')}
            className="ml-4 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
          >
            Quit
          </button>
        </div>

        {/* Instructions */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Select the missing words in the correct order
        </h2>

        {/* Sentence */}
        <div className="mb-10">
          <SentenceCard
            question={questions[current]}
            answer={answers[current]}
            setAnswer={(a) => handleAnswer(a)}
            timeUp={timeUp}
          />
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!answers[current] || answers[current].includes(null) || timeUp}
            onClick={handleNext}
          >
            {current === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
