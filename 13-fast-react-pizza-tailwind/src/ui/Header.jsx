import React from "react";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b border-stone-200 px-4 py-3 uppercase sm:px-6 bg-yellow-400">
      <Link to='/' className="tracking-widest ">Fast React Pizza Co.</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
