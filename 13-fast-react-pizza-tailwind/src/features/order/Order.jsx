import React, { useEffect } from 'react'
import OrderItem from './OrderItem'
import { getOrder } from '../../services/apiRestaurant'
import { useFetcher, useLoaderData } from 'react-router'
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';
import UpdateOrder from './UpdateOrder';


export default function Order() {
    const order = useLoaderData();
    // fetch data from menu 
    const fetcher = useFetcher();

    useEffect(() => {
    if(!fetcher.data && fetcher.state === 'idle')
      fetcher.load('/menu')
    },[fetcher])
      // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);
    // console.log(priority , priorityPrice);


  return (
    <div className='px-4 py-6 space-y-8'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <h2 className='text-xl font-semibold'>Order {id} status</h2>
        <div className='space-x-2'>
            {priority && (<span className='rounded-full bg-red-500 text-sm font-semibold px-3 py-1 uppercase tracking-wide text-red-50'>priority</span>)}
            
            <span className='rounded-full bg-green-500 text-sm font-semibold px-3 py-1 uppercase tracking-wide text-green-50'>{status} order</span>
        </div>
        </div>

        <div className=' flex flex-wrap gap-2 items-center justify-between bg-stone-200 px-6 py-5'>
            <p className=' font-medium '> {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}</p>
            <p className='text-xs text-stone-500'>(Estimated delivery: {formatDate(estimatedDelivery)} )</p>
        </div>

        <ul className='divide-y border-b border-t divide-stone-200'>
            {cart.map((item) => ( 
              <OrderItem 
                item={item} 
                key={item.pizzaId} 
                ingredients={fetcher?.data?.find(el => el.id === item.pizzaId )?.ingredients ?? []}
                isLoadingIngredients={fetcher.state === 'loading'}
              /> )
            )}
            
        </ul>

        <div className=' space-y-2 bg-stone-200 px-6 py-5'>
            <p className='text-sm  text-stone-600 font-semibold'>Price pizza: {formatCurrency(orderPrice)} </p>
            <p className='text-sm  text-stone-600 font-semibold'>Price priority: {formatCurrency(priorityPrice)}</p>
            <p className=' font-bold'>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
        </div>
        {!priority && (
          <UpdateOrder />
        )}
    </div>
  )
}

export async function loader({params}) {
    const order = await getOrder(params.orderId)
    return order ;
}
