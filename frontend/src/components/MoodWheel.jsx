import React, { useState, useEffect } from 'react';
import './MoodWheel.css';

function MoodWheel() {
  const moods = [
    { name: 'Energetic', angle: 22.5, icon: '⚡' },
    { name: 'Comforting', angle: 67.5, icon: '🛋️' },
    { name: 'Romantic', angle: 112.5, icon: '❤️' },
    { name: 'Adventurous', angle: 157.5, icon: '🧭' },
    { name: 'Relaxed', angle: 202.5, icon: '🌿' },
    { name: 'Focused', angle: 247.5, icon: '🎯' },
    { name: 'Cheerful', angle: 292.5, icon: '😊' },
    { name: 'Creative', angle: 337.5, icon: '🎨' },
  ];

  const [typedText, setTypedText] = useState(''); // Initialize as an empty string
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'How are you feeling?';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Typing speed in milliseconds

    const cursorBlinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Blinking speed in milliseconds

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorBlinkInterval);
    };
  }, []);

  const handleMoodClick = (mood) => {
    alert(`You selected: ${mood}`);
  };

  return (
    <div className="mood-wheel-container">
      <h1 className="mood-wheel__label">
        {typedText}
        {showCursor && <span className="mood-wheel__cursor">|</span>}
      </h1>
      <div className="mood-wheel">
        <div className="mood-wheel__center">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="mood-wheel__option"
              style={{
                transform: `rotate(${mood.angle}deg) translate(130px) rotate(-${mood.angle}deg)`,
              }}
            >
              <button
                className="mood-wheel__button"
                onClick={() => handleMoodClick(mood.name)}
                aria-label={mood.name}
              >
                <span className="mood-wheel__icon">{mood.icon}</span>
                <span className="mood-wheel__text">{mood.name}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="mood-wheel__dividers">
          {moods.map((_, index) => (
            <div
              key={index}
              className="mood-wheel__divider"
              style={{
                transform: `rotate(${index * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoodWheel;
