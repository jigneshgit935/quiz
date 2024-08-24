import { useState, useEffect } from "react";

const Question = ({ questionNumber, question, onAnswerClick = () => {} }) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    return () => {
      setFadeIn(false);
    };
  }, [question]);

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div
      className={`question absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="flex gap-1"><span>Q{questionNumber}.</span> <span>{question.question}</span></h2>
      <ul className="options">
        {question.answerOptions.map((option, index) => (
          <li className="link-li" key={option.text}>
            <button
              className="rounded-full button-class flex  justify-center items-center gap-1 "
              onClick={() => onAnswerClick(option.isCorrect)}
            >
              <span className="font-semibold">{optionLabels[index]}.</span>
              <span>{option.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
