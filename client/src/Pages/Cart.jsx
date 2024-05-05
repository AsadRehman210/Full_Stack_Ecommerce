import React, { useState } from 'react'
import PriceFormate from "../Helper/PriceFormate"
import { useCart } from '../Context/CartContext';
import CartNumber from '../Components/CartNumber';
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAuth } from '../Context/store';
import { toast } from 'react-toastify';



const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { cart, RemoveCart, ClearCart, setDecrement, setIncrement, total_Price, shipping_fee } = useCart();
    const API = process.env.REACT_APP_API;
    const { permissionArray, loginUserData } = useAuth()
    if (cart.length === 0) {
        return <div className='cart_legth_zero'>No Item In Cart
            <NavLink to="/products" className="btn btn-primary">Go for Shopping</NavLink></div>
    }

    const shippingCharges = cart.reduce((acc, curVal) => {
        return acc + curVal.quantity

    }, 0)

    const handlePayment = async () => {
        setLoading(true)
        try {
            const stripe = await loadStripe('pk_test_51Oy7lKFqutyKD0kn0doWgTdV9AszHc0LW5a40si8ysHi6feZrL0uYAtzwHN3Ps15gFGYTfNsAEcH0a7sNK2K6XuJ000VEcjc8A');

            const response = await axios.post(`${API}/api/API/create-checkout-session`, {
                products: cart,
                user: loginUserData
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const session = await response.data;
            // console.log(session.id)

            const result = stripe.redirectToCheckout({
                sessionId: session.id
            })

            if (result.error) {
                console.log(result.error)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)

        }
    }

    const handlePaymentLogin = () => {
        toast.error("Please Login Before Payment.")
    }

    const handlePaymentAccess = () => {
        toast.error("You are not authorized to perform this action.")
    }


    return (
        <main className='cart_section'>
            <div className='container'>
                <div className='row cart_row'>
                    <div className='col-12 cart_col_content'>
                        <table style={{ width: "100%" }} >
                            <thead>
                                <tr>
                                    <th className='text-center' style={{ width: "20%" }}>Item</th>
                                    <th className='text-center' style={{ width: "20%" }}>Price</th>
                                    <th className='text-center' style={{ width: "20%" }}>Quantity</th>
                                    <th className='text-center' style={{ width: "20%" }}>Subtotal</th>
                                    <th className='text-center' style={{ width: "20%" }}>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((ele, index) => {
                                    return (
                                        <tr key={ele.id} >
                                            <td className='cart_title'>
                                                <div className='cart_img'>
                                                    <img src={`${API}/${ele.image}`} alt={ele.FeaturedImage} />
                                                </div>
                                                <div className='cart_img_content'>
                                                    <p>{ele.name}</p>
                                                    <p>color :
                                                        <button style={{
                                                            background: ele.color,
                                                            boxShadow: ele.color === 'white' ? '0 0 5px rgba(0, 0, 0, 0.5)' : 'none'
                                                        }}></button></p>
                                                </div>
                                            </td>
                                            <td style={{ width: "20%" }} className='cart_price text-center'>
                                                <PriceFormate price={ele.price} />
                                            </td>
                                            <td style={{ width: "20%" }} className='cart_number w-100'>
                                                <CartNumber
                                                    stock={ele.stock}
                                                    cartNumber={ele.quantity}
                                                    increment={() => setIncrement(ele.id, ele.stock)}
                                                    decrement={() => setDecrement(ele.id)}
                                                />

                                            </td>
                                            <td style={{ width: "20%" }} className='cart_subtotal text-center'>
                                                {<PriceFormate price={ele.price * ele.quantity} />}

                                            </td>
                                            <td style={{ width: "20%" }} className='cart_remove text-center'>
                                                <MdDelete onClick={() => RemoveCart(ele.id)} />

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='cart_button col-12'>
                        <NavLink to="/products" className='btn btn-primary' >
                            Continue Shopping
                        </NavLink>
                        <button className='btn btn-danger' onClick={ClearCart}>
                            Clear Cart
                        </button>


                    </div>
                    <div className='col-12 Total_Summary'>
                        <div className='Total_Summary_Content d-grid'>
                            <p>SubTotal : <strong><PriceFormate price={total_Price} /></strong></p>
                            <p>Shipping Fee : <strong>
                                <PriceFormate
                                    price={shipping_fee}
                                    shipping_quantity={shippingCharges} /></strong> </p>
                            <hr />
                            <p>Order Total : <strong>
                                <PriceFormate
                                    price={total_Price + (shipping_fee * shippingCharges)}

                                />
                            </strong></p>
                            {/* {permissionArray.includes("make payment") ? <button className='btn btn-primary' onClick={handlePayment}>Make Payment
                                {loading && <div className="spinner-border ms-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>}</button> :
                                <button className='btn btn-primary' onClick={handlePaymentLogin}>Make Payment
                                </button>} */}
                            {permissionArray.length ?
                                (permissionArray.includes("make payment") ? <button className='btn btn-primary' onClick={handlePayment}>Make Payment
                                    {loading && <div className="spinner-border ms-3" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}</button> :
                                    <button className='btn btn-primary' onClick={handlePaymentAccess}>Make Payment
                                    </button>)
                                :
                                <button className='btn btn-primary' onClick={handlePaymentLogin}>Make Payment
                                </button>}

                        </div>
                    </div>
                </div>

            </div>
        </main >
    )
}

export default Cart
