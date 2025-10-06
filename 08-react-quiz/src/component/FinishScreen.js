import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function FinishScreen({ maxPossiiblePoints }) {
  const { points, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPossiiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji}You scored <strong>{points}</strong> out of
        {maxPossiiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quize
      </button>
    </>
  );
}
