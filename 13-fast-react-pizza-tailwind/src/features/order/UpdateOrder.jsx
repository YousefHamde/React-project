import React, { useEffect } from 'react'
import Button from '../../ui/Button'
import { useFetcher } from 'react-router'
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrder() {
    const fetcher=useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
        <Button type='primary'>make priority</Button>
    </fetcher.Form>
  )
}

export async function action({params}) {
    const data = {priority : true} ;
    await updateOrder(params.orderId , data)
    return null
    
}
