import React from 'react'
import { TiMinus, TiPlus } from "react-icons/ti";

const CartNumber = ({stock, cartNumber, increment,decrement}) => {
    
    
    return (
        <div className='toggle_quantity'>
            <button onClick={decrement}>
                <TiMinus />
            </button>

            <div className='cart_quantity'>
                {cartNumber}
            </div>

            <button onClick={increment}>
                <TiPlus />
            </button>
        </div>

    )
}

export default CartNumber
