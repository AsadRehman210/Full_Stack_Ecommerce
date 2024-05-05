import React, { useState } from 'react';
import { TiTick, TiMinus, TiPlus } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import { useCart } from "../Context/CartContext"
import { toast } from 'react-toastify';

const ColorBtn = ({ productDetail }) => {
    const { addToCart } = useCart();
    const { colors = [], stock, _id } = productDetail;
    const [colorTick, setColorTick] = useState(colors[0]);
    const [quantity, setQuantity] = useState(1);
    const Increment = () => {
        quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock)
    }
    const Decrement = () => {
        quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)

    }



    return (
        <section>
            <div className='color_section'>
                Color :
                {
                    colors.map((curColor, index) => {
                        return (
                            <button key={index} style={{
                                background: curColor,
                                boxShadow: curColor === 'white' ? '0 0 5px rgba(0, 0, 0, 0.5)' : 'none',
                            }}
                                onClick={() => setColorTick(curColor)}>

                                {curColor === colorTick ? (<TiTick style={{ color: curColor === "white" ? "black" : "white" }} />) : ""}

                            </button>
                        )
                    })
                }
            </div>
            {/* ============================ Add Cart =============================  */}
            <div className='cart_btn'>
                <div className='toggle_quantity'>
                    <button onClick={Decrement}>
                        <TiMinus />
                    </button>

                    <div className='cart_quantity'>
                        {quantity}
                    </div>

                    <button onClick={Increment}>
                        <TiPlus />
                    </button>
                </div>
                {stock > 0 ?
                    <NavLink to="/cart" className="btn btn-primary"
                        onClick={() => addToCart(productDetail, _id, quantity, colorTick)}
                    >Add to Cart</NavLink>
                    :
                    <NavLink className="btn btn-primary"
                        onClick={() => toast.error("Sorry! Stock is not Available")}
                    >Add to Cart</NavLink>}

            </div>
        </section>
    )
}

export default ColorBtn
