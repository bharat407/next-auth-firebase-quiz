"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { quiz } from "../data.js";
import "./quiz.css";
const Page = () => {
  const TIME_LIMIT = 10;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  const { questions } = quiz;
  const { answers, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    console.log("Timer effect triggered");

    let timer;

    if (quizStarted && !showResult && timeLeft > 0) {
      timer = setTimeout(() => {
        console.log("Timer tick");
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (quizStarted && !showResult && timeLeft === 0) {
      console.log("Time's up!");
      onTimeUp();
      nextQuestion();
    }

    return () => {
      console.log("Clearing timer");
      clearTimeout(timer);
    };
  }, [quizStarted, showResult, timeLeft]);

  const onTimeUp = () => {
    setResult((prev) => ({
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1,
    }));
    toast.error(`Time's up!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    nextQuestion();
  };

  const onAnswerSelected = (answer, idx) => {
    if (!quizStarted || showResult) {
      return; // Don't allow answering after quiz ended or before it started
    }

    setSelectedAnswerIndex(idx);
    setQuizStarted(true); // Start the quiz when the first answer is selected

    if (answer === correctAnswer) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }));
      toast.success("Correct answer!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
      toast.error(`Wrong answer. Correct answer: ${correctAnswer}`);
    }

    // Automatically move to the next question
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setTimeLeft(TIME_LIMIT); // Reset the timer

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setActiveQuestion(0);
    setShowResult(false);
    setTimeLeft(TIME_LIMIT); // Start timer when quiz starts
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setActiveQuestion(0);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setSelectedAnswerIndex(null);
    setTimeLeft(TIME_LIMIT);
  };

  return (
    <div className="container">
      <h1 className="heading">Quiz Page</h1>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div>
        {!quizStarted ? (
          <button onClick={startQuiz}>Start Quiz</button>
        ) : (
          <div>
            <h2>
              Question: {activeQuestion + 1}
              <span>/{questions.length}</span>
            </h2>
            {!showResult ? (
              <div className="quiz-container">
                <h3>{questions[activeQuestion].question}</h3>
                {answers.map((answer, idx) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={`${
                      selectedAnswerIndex === idx
                        ? "li-selected"
                        : selectedAnswerIndex !== null && idx === correctAnswer
                        ? "li-correct"
                        : selectedAnswerIndex === idx && idx !== correctAnswer
                        ? "li-wrong"
                        : "li-hover"
                    }`}
                  >
                    <span>{answer}</span>
                  </li>
                ))}
                <div className="timer">Time Left: {timeLeft} seconds</div>
                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswerIndex === null} // Disable button until an answer is selected
                  className="btn"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="quiz-container">
                <h3>Results</h3>
                <h3>
                  Overall {(result.score / (questions.length * 5)) * 100}%
                </h3>
                <p>
                  Total Questions: <span>{questions.length}</span>
                </p>
                <p>
                  Total Score: <span>{result.score}</span>
                </p>
                <p>
                  Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <button onClick={restartQuiz}>Restart</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
