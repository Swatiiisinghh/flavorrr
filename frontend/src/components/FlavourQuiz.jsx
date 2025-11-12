import React, { useState } from 'react';
import './FlavourQuiz.css';

// Define questions before using them
const questions = [
  {
    question: "What flavor is associated with chocolate?",
    correctAnswer: "sweet",
    choices: ["Sweet", "Salty", "Bitter", "Sour"],
  },
  {
    question: "Which flavor is typically found in lemons?",
    correctAnswer: "sour",
    choices: ["Sweet", "Salty", "Bitter", "Sour"],
  },
  {
    question: "What flavor is associated with chili peppers?",
    correctAnswer: "spicy",
    choices: ["Sweet", "Salty", "Bitter", "Spicy"],
  },
  {
    question: "Which flavor is associated with vanilla?",
    correctAnswer: "sweet",
    choices: ["Sweet", "Salty", "Bitter", "Sour"],
  },
];

// Define getRandomQuestion after questions
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

const QuickFlavorQuiz = () => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setFeedback('Correct! 🎉');
      setScore(score + 1);
    } else {
      setFeedback('Oops! Try again. ❌');
    }

    setTimeout(() => {
      setFeedback('');
      setCurrentQuestion(getRandomQuestion());
    }, 1500);
  };

  return (
    <div className="quiz-container">
      <h1>Quick Flavor Quiz</h1>
      <p id="question">{currentQuestion.question}</p>
      <div className="choices">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            className="choice"
            onClick={() => checkAnswer(choice.toLowerCase())}
          >
            {choice}
          </button>
        ))}
      </div>
      <div id="feedback">{feedback}</div>
      <div id="score">Score: {score}</div>
    </div>
  );
};

export default QuickFlavorQuiz;
