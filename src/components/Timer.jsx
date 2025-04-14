import { useEffect, useState } from 'react';

export default function Timer({ duration = 30, onTimeUp }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft <= 0) return; // Stop the timer once it's 0

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval when the component unmounts or when secondsLeft changes
    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp(); // Call onTimeUp when the time runs out
    }
  }, [secondsLeft, onTimeUp]);

  return (
    <div className="mb-4 text-right text-lg font-semibold text-red-600">
      Time Left: {secondsLeft}s
    </div>
  );
}
