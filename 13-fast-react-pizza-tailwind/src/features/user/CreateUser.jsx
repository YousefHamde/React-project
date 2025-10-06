import React, { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router";

export default function CreateUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return ;
    dispatch(updateName(username))
    navigate('/menu');
    setUsername('')
  }
  return (
    <form  onSubmit={handleSubmit}>
      <p className="text-sm md:text-base mb-4  text-stone-600 ">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        type="text"
        placeholder="Your full name"
        className="input mb-8 w-72"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        {username && (<Button type="primary">start ordering</Button>)}
      </div>
    </form>
  );
}
