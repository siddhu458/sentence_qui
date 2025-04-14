import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  // Guard: if state is undefined (direct access), send back to /
  useEffect(() => {
    if (!state || !state.questions || !state.answers) {
      navigate('/');
      return;
    }

    const correctCount = state.questions.reduce((acc, q, idx) => {
      const userAnswer = state.answers[idx] || [];
      const correct = JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer);
      return acc + (correct ? 1 : 0);
    }, 0);

    setScore(correctCount);
  }, [state, navigate]);

  // Guard for render
  if (!state || !state.questions || !state.answers) return null;

  const { questions, answers } = state;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-600">
        Your Score: {score} / {questions.length}
      </h2>

      {questions.map((q, idx) => {
        const userAnswer = answers[idx] || [];
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer);

        return (
          <div key={q.questionId} className="mb-6 border p-4 rounded shadow">
            <div className="mb-2 font-medium">
              <span className="text-gray-700">Q{idx + 1}:</span> {q.question}
            </div>

            <div className="mt-2 text-sm">
              <div>
                <strong>Your Answer:</strong>{' '}
                {userAnswer.length > 0 ? userAnswer.join(', ') : 'Not Answered'}
              </div>
              {!isCorrect && (
                <div className="text-red-500 mt-1">
                  <strong>Correct Answer:</strong> {q.correctAnswer?.join(', ')}
                </div>
              )}
              <div className={`mt-2 font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '✅ Correct' : '❌ Incorrect'}
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
