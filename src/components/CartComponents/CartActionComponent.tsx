
import { selectCounter } from '@/redux/features/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { ShoppingCart } from 'lucide-react';

export default function CartActionComponent() {
       const count = useAppSelector(selectCounter)
  return (
    <div className='relative'>
           <ShoppingCart/>
           <div className='rounded-4xl bg-red-500 p-1 absolute bottom-3 left-3 w-[25px] h-[25px] text-center  '>
             {count}
           </div>
    </div>
  )
}
