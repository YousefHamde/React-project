import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice';
import UpdateItemQuantity from './UpdateItemQuantity';

export default function DeleteItem({pizzaId}) {
  const dispatch = useDispatch();
  return (
    <div className='flex items-center gap-3 sm:gap-8'>
    <UpdateItemQuantity pizzaId={pizzaId} />
    <Button type='small' onClick={() => dispatch(deleteItem(pizzaId))} >Delete</Button>
    </div>
  )
}
