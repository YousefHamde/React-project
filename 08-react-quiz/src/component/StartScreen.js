import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  
  const { dispatch, questions } = useQuiz();
  
  const numQuestiuons = questions.length;


  return (
    <div className="start">
      <h2>Welcom to the React Quize! </h2>
      <h3>{numQuestiuons} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
