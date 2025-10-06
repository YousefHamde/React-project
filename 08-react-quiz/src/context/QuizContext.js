import React, { createContext, useReducer, useContext, useEffect } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "open",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  selectQuiz: "",
  selectDifficulty: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectQuiz":
      return {
        ...state,
        selectQuiz: action.payload,
        status: "selectDifficulty",
      };
    case "selectDifficulty":
      return { ...state, selectDifficulty: action.payload, status: "loading" };
    case "loading":
      return { ...state, status: "dataReceived" };
    case "dataReceived":
      return {
        ...state,
        questions: state.selectDifficulty
          ? action.payload.filter((q) => q.level === state.selectDifficulty)
          : action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    selectQuiz,
  } = state;

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        selectQuiz,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}


function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
