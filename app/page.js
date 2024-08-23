"use client";

import SubmitForm from "@/components/SubmitForm";
import React, { useEffect, useState } from "react";
import questionsData from "../constant/questions.json";
import Question from "@/components/Questions";
import Result from "@/components/Result";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Shuffle the questions and select the first 5
    const shuffledQuestions = shuffleArray([...questionsData]);
    setQuestions(shuffledQuestions.slice(0, 5));
  }, []);

  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswers([...userAnswers, isCorrect]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    // Reshuffle the questions and reset
    const shuffledQuestions = shuffleArray([...questionsData]);
    setQuestions(shuffledQuestions.slice(0, 5));
  };

  return (
    <div className="relative h-screen">
      <img src="/jFiest222.gif" alt="Animated GIF" className="w-full h-full object-cover" />
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full bg-yellow-400 max-w-[200px] w-[100%] py-3 shadow-md" >
        Start Quiz
      </button>
      {/* Questions Component */}
      {/* {currentQuestion < questions.length && (
        <>
          <div className="border-2 border-blue-500 h-[430px]"></div>

          <Question
            question={questions[currentQuestion]}
            onAnswerClick={handleNextQuestion}
          />
        </>
      )} */}

      {/* Result Component  */}
      {/* {currentQuestion === questions.length && (
        <Result
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )} */}
      {/* <SubmitForm /> */}
    </div>
  );
};

export default Home;
