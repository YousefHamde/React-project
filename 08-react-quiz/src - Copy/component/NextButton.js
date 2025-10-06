

export default function NextButton({ dispatch, answer , index ,numQuestiuons}) {
  if (answer === null) return;
  if(index < numQuestiuons -1) return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>next</button>
  );
  if(index === numQuestiuons -1) return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finished" })}>Finish</button>
  );

  
}
