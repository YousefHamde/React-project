import { useEffect } from "react";
export default function Loader({dispatch, selectQuiz}) {
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
