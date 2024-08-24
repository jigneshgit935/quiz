"use client";

import SubmitForm from "@/components/SubmitForm";
import React, { useEffect, useState } from "react";
import questionsData from "../constant/questions.json";
import Question from "@/components/Questions";
import Result from "@/components/Result";

// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

const Home = () => {
  // const [showQuestion, setShowQuestion] = useState(false);
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [userAnswers, setUserAnswers] = useState([]);
  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   // Shuffle the questions and select the first 5
  //   const shuffledQuestions = shuffleArray([...questionsData]);
  //   setQuestions(shuffledQuestions.slice(0, 5));
  // }, []);

  // const handleNextQuestion = (isCorrect) => {
  //   setCurrentQuestion(currentQuestion + 1);
  //   setUserAnswers([...userAnswers, isCorrect]);
  // };

  // const resetQuiz = () => {
  //   setCurrentQuestion(0);
  //   setUserAnswers([]);
  //   // Reshuffle the questions and reset
  //   const shuffledQuestions = shuffleArray([...questionsData]);
  //   setQuestions(shuffledQuestions.slice(0, 5));
  // };
  // const [fadeIn, setFadeIn] = useState(false);

  // useEffect(() => {
  //   setFadeIn(true);

  //   return () => {
  //     setFadeIn(false);
  //   };
  // }, []);
  return (
    // <div className={`relative h-screen container mx-auto max-h-screen min-h-screen max-w-lg
    // transition-opacity duration-1000 ease-in-out ${
    //     fadeIn ? "opacity-100" : "opacity-0"
    //   }
    // `}>
    //   {currentQuestion === questions.length ? (
    //     <>
    //       {/* Result Component  */}
    //       {currentQuestion === questions.length && (
    //         <Result
    //           userAnswers={userAnswers}
    //           questions={questions}
    //           resetQuiz={resetQuiz}
    //         />
    //       )}
    //       {/* <SubmitForm /> */}
    //     </>
    //   ) : (
    //     <>
    //       <img
    //         src="/jFiest222.gif"
    //         alt="Animated GIF"
    //         className="w-[100%] h-[100%]  object-cove"
    //       />
    //       {!showQuestion && (
    //         <button
    //           onClick={() => {
    //             setShowQuestion(true);
    //           }}
    //           className="button-73 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "
    //         >
    //           Start Quiz
    //         </button>
    //       )}

    //       {/* Questions Component */}
    //       {showQuestion && (
    //         <>
    //           {currentQuestion < questions.length && (
    //             <>
    //               <Question
    //                 question={questions[currentQuestion]}
    //                 onAnswerClick={handleNextQuestion}
    //                 questionNumber={currentQuestion + 1}
    //               />
    //             </>
    //           )}
    //         </>
    //       )}
    //     </>
    //   )}
    // </div>
    <div>Hello Welcome</div>
  );
};

export default Home;
