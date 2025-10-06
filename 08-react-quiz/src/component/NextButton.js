import { useQuiz } from "../context/QuizContext";


export default function NextButton({ numQuestiuons}) {
  const { dispatch, answer , index  } = useQuiz();
  if (answer === null) return;
  if(index < numQuestiuons -1) return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>next</button>
  );
  if(index === numQuestiuons -1) return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finished" })}>Finish</button>
  );

  
}
