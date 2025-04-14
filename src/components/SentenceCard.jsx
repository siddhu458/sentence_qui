import { useEffect, useState } from 'react';
import WordOption from './WordOption';

export default function SentenceCard({ question, answer, setAnswer, timeUp }) {
  const [blanks, setBlanks] = useState([]);

  useEffect(() => {
    const initialBlanks = Array(question.correctAnswer.length).fill(null);
    setBlanks(answer || initialBlanks);
  }, [question, answer]);

  const handleWordClick = (word) => {
    if (timeUp) return;
    const index = blanks.findIndex((b) => b === null);
    if (index === -1) return;
    const newBlanks = [...blanks];
    newBlanks[index] = word;
    setBlanks(newBlanks);
    setAnswer(newBlanks);
  };

  const handleBlankClick = (index) => {
    if (timeUp) return;
    const newBlanks = [...blanks];
    newBlanks[index] = null;
    setBlanks(newBlanks);
    setAnswer(newBlanks);
  };

  let blankCount = 0;

  return (
    <div className="w-full max-w-5xl mx-auto text-center">
      {/* Sentence Display */}
      <div className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-8 flex flex-wrap justify-center gap-3 text-gray-800">
        {question.question.split(/\s+/).map((word, i) => {
          if (word === '_____________') {
            const index = blankCount++;
            return (
              <span
                key={i}
                onClick={() => handleBlankClick(index)}
                className={`inline-block px-4 py-2 min-w-[100px] border-2 rounded-lg cursor-pointer transition ${
                  blanks[index] ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'
                }`}
              >
                {blanks[index] || '______'}
              </span>
            );
          } else {
            return (
              <span key={i} className="inline-block whitespace-nowrap">
                {word}&nbsp;
              </span>
            );
          }
        })}
      </div>

      {/* Word Options */}
      <div className="flex flex-wrap gap-4 justify-center">
        {question.options.map((word, idx) => (
          <WordOption
            key={idx}
            word={word}
            onClick={() => handleWordClick(word)}
            disabled={blanks.includes(word) || timeUp}
          />
        ))}
      </div>
    </div>
  );
}
