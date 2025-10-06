

export default function Progress({index , numQuestiuons , points , maxPossiiblePoints , answer}) {
  return (
    <header className="progress">
    <progress max={numQuestiuons} value={index + Number(answer !== null)}/>
      <p>Question <strong>{index + 1}</strong> / {numQuestiuons}</p>
      <p><strong>{points}</strong> / {maxPossiiblePoints} points</p>
    </header>
  )
}
