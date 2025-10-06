import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
export default function Loader() {
  const {dispatch, selectQuiz} = useQuiz();
  useEffect(
    function () {
      // fetch("http://localhost:8000/questions")
      fetch(`http://localhost:9000/${selectQuiz}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFaild", payload: err }));
    },
    [selectQuiz, dispatch]
  );
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}
