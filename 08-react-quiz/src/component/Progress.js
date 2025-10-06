import { useQuiz } from "../context/QuizContext";


export default function Progress({ numQuestiuons  , maxPossiiblePoints }) {
  const {index , points , answer} = useQuiz();
  return (
    <header className="progress">
    <progress max={numQuestiuons} value={index + Number(answer !== null)}/>
      <p>Question <strong>{index + 1}</strong> / {numQuestiuons}</p>
      <p><strong>{points}</strong> / {maxPossiiblePoints} points</p>
    </header>
  )
}
