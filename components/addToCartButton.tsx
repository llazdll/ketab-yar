'use client'
import { Button } from './ui/button'
import { FaShoppingCart } from 'react-icons/fa'
import { addToCartAction } from '@/utils/actions'

async function AddToCartButton({product_id}:{product_id:string}) {
  return (
    <Button
              onClick={async () => await addToCartAction(product_id)}
              size="lg"
            >
              <FaShoppingCart />
              افزودن به سبد خرید
            </Button>
  )
}

export default AddToCartButton