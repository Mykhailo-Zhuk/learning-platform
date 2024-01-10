"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import CorrectAnswers from "./CorrectAnswers";
import Spinner from "../ui/spinner";

type Params = { params: string };

const Questions = ({ params }: Params) => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = useStore((state) => state.questions);
  const setQuestions = useStore((state) => state.getQuestions);

  useEffect(() => {
    const fetchData = async () => {
      await setQuestions(params);
      setLoading(false);
    };
    fetchData();

    const storedAnswers = localStorage.getItem("testResults");

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, [setQuestions, params]);

  const handleAnswerSelection = (questionId: number | string, selectedAnswer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const checkAnswer = (questionId: number | string) => {
    if (submitted) {
      if (
        answers[questionId] ===
        questions[0]?.tasks.find((task) => task.id === questionId)?.correctAnswer
      ) {
        return "bg-green-100 rounded-lg p-1";
      }
      return "bg-red-100 rounded-lg p-1";
    }
    return "";
  };

  const handleSubmit = () => {
    setSubmitted(true);
    localStorage.setItem("testResults", JSON.stringify(answers));
  };

  let content;

  if (questions?.length === 0) {
    return (
      <h1 className="text-2xl text-center p-5">В цьому розділі немає жодних практичних завдань</h1>
    );
  }

  if (loading) {
    content = <Spinner />;
  } else {
    if (questions[0]?.tasks.length === 0) {
      return (
        <h1 className="text-2xl text-center py-5">
          В цьому розділі немає жодних практичних завдань
        </h1>
      );
    }
    content = questions[0]?.tasks?.map((question) => {
      return (
        <div key={question?.id} className={`mb-3 ${checkAnswer(question?.id)}`}>
          <p className="text-lg font-medium mb-2">{question?.question}</p>
          {question?.options.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`question${question?.id}`}
                  value={option}
                  onChange={() => handleAnswerSelection(question?.id, option)}
                  checked={answers[question?.id] === option}
                  className="text-indigo-600 h-4 w-4"
                />
                <span className="ml-2">{option}</span>
              </label>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
            Submit
          </button>
          <CorrectAnswers correct={answers} />
        </div>
      );
    });
  }

  // TODO: message about nothing if questions for particular theme are not found

  return <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">{content}</div>;
};

export default Questions;
