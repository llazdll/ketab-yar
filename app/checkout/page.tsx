import React from 'react'
import CustomButton from '../CustomeButton'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'

function Checkout() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
            <h1>
                Checkout
            </h1>
        <CustomButton
        title='ثبت خرید'
        icon={<MdOutlineShoppingCartCheckout />}
        >
            
        </CustomButton>
        </div>
    )
}

export default Checkout