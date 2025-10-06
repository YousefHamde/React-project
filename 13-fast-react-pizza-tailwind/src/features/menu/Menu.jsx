import React from 'react'
import MenuItem from './MenuItem'
import { getMenu } from '../../services/apiRestaurant'
import { useLoaderData } from 'react-router'

export default function Menu() {
  const menu =useLoaderData();
  
  return (
    <ul className='divide-y divide-stone-200 px-2'>
        {menu.map((pizza) => <MenuItem pizza={pizza} key={pizza.id} /> )}
        
    </ul>
  )
}

export async function Loader (){
  const menu = await getMenu();
  return menu
}
