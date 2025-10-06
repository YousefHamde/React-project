import { formatCurrency } from '../../utils/helpers'

export default function OrderItem({item , isLoadingIngredients , ingredients}) {
    const {
        name,
        quantity,
        totalPrice,
    } = item;
    
  return (
         <li className='py-3 space-y-1'>
            <div className='flex items-center justify-between gap-4 text-sm'>
                <p >
                    <span className='font-bold'>{quantity}&times; </span> 
                    {name}
                </p>
                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>
            <p className='text-sm text-stone-500 italic capitalize'>{!isLoadingIngredients ? ingredients?.join(', ') : 'Loading...'}</p>
        </li>
  )
}
