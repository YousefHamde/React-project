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

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  // 'loading' , 'error' , 'ready', 'avtive' , 'finished'
  status: "open",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaning: null,
  selectQuiz: "",
  selectDifficulty: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectQuiz":
      return {
        ...state,
        selectQuiz: action.payload,
        status: "selectDifficulty"
      };
      case "selectDifficulty":
        return {
          ...state,
          selectDifficulty: action.payload,
          status: "loading"
      };
      case "loading":
        return {
          ...state,
          status: "dataReceived"
          };
    case "dataReceived":
      console.log(state.selectDifficulty);
      return {
        ...state,
        questions:state.selectDifficulty ? action.payload.filter((question) => question.level === state.selectDifficulty) : action.payload,
        status: "ready",
      };
    case "dataFaild":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaning: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        answer: null,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaning: state.secondRemaning - 1,
        status: state.secondRemaning === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondRemaning,
      selectQuiz,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestiuons = questions.length;
  const maxPossiiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

 

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "open" && <SelectContentQuiz dispatch={dispatch} />}
        {status === "selectDifficulty" && (<SelectLevels dispatch={dispatch}  />)}
        {status === "loading" && <Loader  dispatch={dispatch} selectQuiz={selectQuiz}/>}
        {selectQuiz && status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestiuon={numQuestiuons} dispatch={dispatch}  />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestiuons={numQuestiuons}
              index={index}
              points={points}
              maxPossiiblePoints={maxPossiiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaning={secondRemaning} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
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
