import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();


  const mins = Math.floor((secondsRemaining ?? 0) / 60);
  const secs = (secondsRemaining ?? 0) % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  if (secondsRemaining === 0) return null;

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}
