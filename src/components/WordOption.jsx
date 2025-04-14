export default function WordOption({ word, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 rounded-full font-medium text-base transition duration-200 ease-in-out shadow-md
        ${disabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
        }`}
    >
      {word}
    </button>
  );
}
