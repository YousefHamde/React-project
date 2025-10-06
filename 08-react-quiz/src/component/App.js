import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import SelectContentQuiz from "./SelectContentQuiz";
import SelectLevels from "./SelectLevels";
import { useQuiz } from "../context/QuizContext";

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondRemaning,
    selectQuiz,
    dispatch,
  } = useQuiz();

  const numQuestiuons = questions.length;
  const maxPossiiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "open" && <SelectContentQuiz />}
        {status === "selectDifficulty" && <SelectLevels  />}
        {status === "loading" && (
          <Loader  />
        )}
        {selectQuiz && status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen  />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestiuons={numQuestiuons}
              maxPossiiblePoints={maxPossiiblePoints}
             
            />
            <Question

            />
            <Footer>
              <Timer  />
              <NextButton

                numQuestiuons={numQuestiuons}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiiblePoints={maxPossiiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
