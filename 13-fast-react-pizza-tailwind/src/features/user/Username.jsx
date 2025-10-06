import React from "react";
import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector(state => state.user.username);
  if(!username) return null ;
  return (
    <div className="hidden sm:block text-sm font-semibold">{username}</div>
  );
}
