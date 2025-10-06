import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function SelectContentQuiz() {
  const { dispatch } = useQuiz();
  return (
    <select
      className="btn btn-ui select"
      onChange={(e) => {
        dispatch({ type: "selectQuiz", payload: e.target.value });
      }}
    >
      <option value="">-- Select a Quiz --</option>
      <option value="html">Html</option>
      <option value="css">Css</option>
      <option value="js">Javascript</option>
      <option value="react">React</option>
      <option value="all">All</option>
    </select>
  );
}
