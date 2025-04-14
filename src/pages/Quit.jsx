// src/pages/Quit.jsx
import { useNavigate } from 'react-router-dom';

export default function Quit() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Quit Quiz?</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to exit the quiz? Your progress will be lost.</p>
        <div className="flex justify-around">
          <button
            onClick={() => navigate(-1)} // Go back to quiz
            className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/home')} // Navigate to home
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
