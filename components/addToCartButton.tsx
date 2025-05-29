'use client'

import { Button } from './ui/button'
import { FaShoppingCart } from 'react-icons/fa'
import { addToCartAction } from '@/utils/actions'
import { toast } from 'sonner'
import { useState } from 'react'

function AddToCartButton({ product_id }: { product_id: string }) {
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      const result = await addToCartAction(product_id)

      if (result.success) {
        toast.success('کتاب به سبد خرید اضافه شد', {
          description: 'برای ادامه فرآیند اجاره، می‌توانید به سبد خرید مراجعه کنید.',
          action: {
            label: 'مشاهده سبد خرید',
            onClick: () => (window.location.href = '/cart'),
          },
        })
      } else {
        toast.error(result.error || 'این کتاب در  سبد خرید هست')
      }
    } catch (error) {
      toast.error('خطای غیرمنتظره در افزودن به سبد خرید')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      disabled={loading}
      className={loading ? 'opacity-60 cursor-not-allowed' : ''}
    >
      <FaShoppingCart className="ml-2" />
      {loading ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
    </Button>
  )
}

export default AddToCartButton
