/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { Button, Modal, ModalClose, Sheet } from "@mui/joy";
import SubmitForm from "./SubmitForm";

const Result = ({ userAnswers, questions, resetQuiz = () => {} }) => {
  const [open, setOpen] = useState(false);

  const correctAnswers = userAnswers.filter((answer) => answer).length;
  const [submitTrue, setSubmitTrue] = useState(false);

  let offerMessage;
  switch (correctAnswers) {
    case 1:
      offerMessage = "10% off your next order!";
      break;
    case 2:
      offerMessage = "20% off your next order!";
      break;
    case 3:
      offerMessage = "30% off your next order!";
      break;
    case 4:
      offerMessage = "40% off your next order!";
      break;
    case 5:
      offerMessage = "50% off your next order!";
      break;
    default:
      offerMessage = "Better luck next time!";
  }

  return (
    <div className="results">
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          marginTop: "20px",
          // marginLeft: "10px",
          // marginRight: "10px",
        }}
      >
        <Sheet
          className="modal-confirm-product-request"
          variant="outlined"
          sx={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ marginTop: "6px" }} />
          <div className="flex h-[100%] flex-col justify-between py-6">
            <ul>
              {questions.map((question, index) => {
                return (
                  <li key={index} data-correct={userAnswers[index]}>
                    Q{index + 1}. {question.question}
                    <b>
                      {userAnswers[index]
                        ? `- ${
                            question.answerOptions.find((ans) => ans.isCorrect)
                              .text
                          }`
                        : `- ${
                            question.answerOptions.find((ans) => ans.isCorrect)
                              .text
                          }`}
                    </b>
                  </li>
                );
              })}
            </ul>
          </div>
        </Sheet>
      </Modal>

      {submitTrue ? (
        <>
          <h2>Results</h2>

          <p>
            You answered {correctAnswers} out of {questions.length} questions{" "}
            <span onClick={resetQuiz}>Click here to Retry</span>
          </p>

          <p>{offerMessage}</p>

          <Button className="" onClick={() => setOpen(true)}>
            View Answers
          </Button>
        </>
      ) : (
        <>
          <SubmitForm  setSubmitTrue={setSubmitTrue}/>
        </>
      )}
    </div>
  );
};

export default Result;
