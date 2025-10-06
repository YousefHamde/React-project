import React, { useState } from 'react'
import Button from '../../ui/Button';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store'
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


export default function CreateOrder() {
  const [withPriority , setWithPriority] = useState(false)
  const {username , status : addressStatus , position , address , error : errorAddress} = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cart)

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch()
  // console.log(errors);
const totalCartPrice = useSelector(getTotalCartPrice);
const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0 ;
const totalPrice = totalCartPrice +  priorityPrice ;
// ///
  const isLoadingAddress = addressStatus === 'loading'

  return (
    <div className='py-3 px-4'>
        <h2 className='text-xl font-bold mb-10'>Ready to order? Let's go!</h2>
        <Form method='POST' >
          <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center '>
            <label className='sm:basis-40 capitalize'>first name</label>
            <input className='input grow' type='text' name="customer" defaultValue={username} required/>
          </div>


          <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center '>
            <label className='sm:basis-40 capitalize'>phone number</label>
            <div className='grow'>

              <input className='input w-full' type='tel' name="phone" required/>
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>


          <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center relative '>
            <label className='sm:basis-40 capitalize'>address</label>
            <div className='grow'>

            <input className='input w-full' type='text' name="address" defaultValue={address}  required/>
              {addressStatus === 'error' && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress} error
                </p>
              )}
            </div>
            {!position.latitude && !position.longitude && (

            <span className='absolute right-[3px] top-[35px] sm:right-[3px] sm:top-[3px]  md:right-[5px] md:top-[7px]  z-50 ' >
              <Button type='small' disabled={isLoadingAddress} onClick={(e) => { 
                e.preventDefault();
                dispatch(fetchAddress())
                }
                } >get position</Button>
            </span>
            )}
          </div>
          <div className='flex items-center gap-5 mb-12'>
          <input 
            className='h-6 w-6 accent-yellow-500 focus:outline-none focus:ring-amber-400 focus:ring-offset-2 '
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label  htmlFor="priority " className='font-medium'  >Want to yo give your order priority?</label>
          </div>

          <div>
            <input type='hidden' name='cart' value={JSON.stringify(cart)}/>
            <input type='hidden' value={position.latitude && position.longitude ? `${position.latitude} , ${position.longitude}` : ''} />
            <Button type='primary' disabled={isSubmitting || isLoadingAddress} >
              {isSubmitting ?  ' Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
    </div>
  )
}

export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data.priority);

    const order = {
      ...data,
      cart : JSON.parse(data.cart) ,
      priority: data.priority === 'true'
    }

    let errors = {}
    if(!isValidPhone(order.phone))
        errors.phone = 'please give us your correct phone number. we might need it to contact you.';

    if(Object.keys(errors).length > 0) return errors ;

    const newOrder = await createOrder(order);

    // not over use
    store.dispatch(clearCart())
    

    console.log(newOrder);

    return redirect(`/order/${newOrder.id}`)
}
