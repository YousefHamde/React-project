import React from 'react'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseItemQuantity, getQuantityById, increaseItemQuantity } from './cartSlice';

export default function UpdateItemQuantity({pizzaId}) {
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getQuantityById(pizzaId))
  return (
    <div className='flex items-center gap-1 md:gap-3'>
        <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span className='font-semibold'>{currentQuantity}</span>
        <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}
