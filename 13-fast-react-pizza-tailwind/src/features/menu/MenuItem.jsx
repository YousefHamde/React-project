import React from "react";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

export default function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const {id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  const currentQuantity = useSelector(getQuantityById(id));

  function handleAddToCart (){
    console.log(id);
    const newItem =  {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    }

    dispatch(addItem(newItem))
  }
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''} `} />
      <div className="flex grow flex-col pt-0.5">
        <p className="capitalize font-medium">{name}</p>
        <p className="capitalize text-stone-500 italic text-sm">
          {ingredients.join(",")}
        </p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut? 
            (<p className="text-sm ">{formatCurrency(unitPrice)}</p>) :
            (<p className="text-sm font-medium uppercase text-stone-500">soldOut</p>)
          }
          
          {currentQuantity > 0 && (<DeleteItem type='small' pizzaId={id} >Delete</DeleteItem>)}
          {!soldOut && !currentQuantity && <Button type="small" onClick={handleAddToCart}>Add to cart</Button> }
          
        </div>
      </div>
    </li>
  );
}
