

export default function SelectLevels({ dispatch }) {

  return (
    <select
      className="btn btn-ui select"
      onChange={(e) =>
        dispatch({ type: "selectDifficulty", payload: e.target.value })
      }
    >

      <option value="">-- Select Difficulty--</option>
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
      <option value="">all</option>
    </select>
  );
}
