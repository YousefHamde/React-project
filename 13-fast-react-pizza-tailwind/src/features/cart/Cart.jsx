import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";



export default function Cart() {
  const username = useSelector(state => state.user.username);
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  if(cart.length === 0) return <EmptyCart />
  
  return (
    <div className="py-3 px-4">
        <LinkButton to='/menu' >&larr; Back to menu</LinkButton>
        <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
        <ul className="mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item ) => 
                <CartItem  item={item} key={item.pizzaId} />
            )}
        </ul>
        <div className="mt-6 space-x-2">
            <Button to='/order/new' type='primary' >order pizzas</Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())} >clear cart</Button>
        </div>
    </div>
  )
}
