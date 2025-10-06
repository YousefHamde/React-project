import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

export default function CartOverView() {
  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);
  
  if(!totalQuantity) return null ;
  return (
    <div className="flex justify-between items-center bg-stone-800 px-4 py-4 uppercase text-sm text-stone-200 sm:px-6 md:text-base">
      <p>
        <span>{totalQuantity} pizzas</span>
        <span> {formatCurrency(totalPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}
