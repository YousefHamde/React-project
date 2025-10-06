import React from 'react'
import { Link } from 'react-router'
import LinkButton from '../../ui/LinkButton'

export default function EmptyCart() {
  return (
    <div className='px-4 py-3'>
        <LinkButton to='/menu'> &larr; Back to menu</LinkButton>
        <p className=' mt-7 text-red-700 font-semibold'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  )
}
