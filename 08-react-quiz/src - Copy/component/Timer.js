import React, { useEffect } from "react";

export default function Timer({ dispatch, secondRemaning }) {
  const mins = Math.floor(secondRemaning / 60);
  const secs = secondRemaning % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}
