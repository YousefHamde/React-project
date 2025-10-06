

export default function StartScreen({ numQuestiuon, dispatch}) {

   

  return (
    <div className="start">
      <h2>Welcom to the React Quize! </h2>
      <h3>{numQuestiuon} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
