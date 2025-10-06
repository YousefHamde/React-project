import { useQuiz } from "../context/QuizContext";
import Option from "./Option";
export default function Question() {
  const { index , dispatch,answer , questions } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
