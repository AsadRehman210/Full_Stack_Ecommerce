import React, { useEffect, useRef, useState } from 'react';
// import '../../CSS/index.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import PriceFormate from '../../Helper/PriceFormate';
import { IoIosArrowBack } from "react-icons/io";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from 'react-to-print';
import { useAuth } from '../../Context/store';



const OrderInvoice = () => {
    let componentRef = useRef();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)

    }
    const API = process.env.REACT_APP_API;
    const {authorizationToken} = useAuth();
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);

    // console.log(orderDetail)
    const formattedDate = new Date(orderDetail.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedTime = new Date(orderDetail.createdAt).toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });


    const getOrderData = async () => {
        try {
            let res = await axios.get(`${API}/API/Order/getIndividualOrderData/${id}`, {
                headers: {
                    Authorization: authorizationToken
                }

            })
            const result = res.data;
            // console.log(result.message);
            setOrderDetail(result.message)

        } catch (error) {
            console.log(error.message)

        }

    }
    useEffect(() => {

        getOrderData();
    }, [])

    return (
        <section className='Order_Invoice_section'>
            <div className='Order_heading'>
                <div className='row Order_heading_row'>
                    <div className='col-12 Order_heading_col'>
                        <div className="Order_heading_body">
                            <h3>Order Invoice</h3>
                            <div className='Add_Order_btn'>
                                <button type='button' className="btn btn-primary " onClick={handleBack}><IoIosArrowBack /> Back</button>
                                {/* ReactToPrint component for printing */}
                                <ReactToPrint
                                    trigger={() => <button type='button' className="btn btn-primary"><FaPrint className='me-3' /> Print</button>}

                                    content={() => componentRef.current} // Specify the component to print
                                    documentTitle='Asad Store Invoice'
                                    pageStyle="print"

                                />

                            </div>

                        </div>
                    </div>
                </div>

            </div>


            <div className='Order_invoice_show' ref={componentRef}>
                <div className='row Order_invoice_show_row'>
                    <div className='col-12 main_logo'>
                        <p className="navbar-brand nav_brand" >
                            <span className='text-white'>Asad</span> Store
                        </p>


                    </div>
                    <div className='col-12 order_details'>
                        <h4>Order Details :</h4>
                        <p>Transaction Id : <strong style={{ textTransform: "none" }}>{orderDetail.paymentIntentId}</strong>
                            <br />
                            Order Id : <strong>{orderDetail.orderId}</strong>
                            <br />
                            Order Date : <strong>{formattedDate}</strong>
                            <br />
                            Order Time : <strong>{formattedTime}</strong>
                            <br />
                            Payment Status : <span class="badge rounded-pill text-bg-danger">{orderDetail.payment_status}</span>
                            <br />
                            Order Status : <span class="badge rounded-pill text-bg-primary">{orderDetail.delivery_status}</span>
                            <br />
                            Payment Method : <strong>Stripe</strong>
                        </p>

                    </div>
                    <div className='col-12 col-lg-6 col-md-6 billing_address'>
                        <h4>Billing Address :</h4>
                        {orderDetail.shipping && (
                            <p>
                                Name : <strong>{orderDetail.shipping.name}</strong>
                                <br />
                                Email : <strong style={{ textTransform: "none" }}>{orderDetail.shipping.email}</strong>
                                <br />
                                phone : <strong>{orderDetail.shipping.phone}</strong>
                                <br />
                                Address : <strong> Mohallah Hajwair Nagar, Narowal </strong>
                                <br />
                                Country: <strong>{orderDetail.shipping.address.country}</strong>
                                <br />
                                City: <strong>{orderDetail.shipping.address.city}</strong>
                                <br />
                                zip: <strong>{orderDetail.shipping.address.postal_code}</strong>
                            </p>
                        )}

                    </div>
                    <div className='col-12 col-lg-6 col-md-6 shipping_address'>
                        <h4>Shipping Address :</h4>
                        {orderDetail.shipping && (
                            <p>
                                Name : <strong>{orderDetail.shipping.name}</strong>
                                <br />
                                Email : <strong style={{ textTransform: "none" }}>{orderDetail.shipping.email}</strong>
                                <br />
                                phone : <strong>{orderDetail.shipping.phone}</strong>
                                <br />
                                Address : <strong> Mohallah Hajwair Nagar, Narowal </strong>
                                <br />
                                Country: <strong>{orderDetail.shipping.address.country}</strong>
                                <br />
                                City: <strong>{orderDetail.shipping.address.city}</strong>
                                <br />
                                zip: <strong>{orderDetail.shipping.address.postal_code}</strong>
                            </p>
                        )}


                    </div>
                    <div className='col-12 products_detail'>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th >Image</th>
                                    <th >Product Name</th>
                                    <th >Color</th>
                                    <th >Category</th>
                                    <th >Quantity</th>
                                    <th >Company</th>
                                    <th >Price</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {orderDetail.products && orderDetail.products.map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td className='col_image'>
                                                <div className='image_declared' bodyClassName="image_declared">
                                                    <img src={`${API}/${order.image}`} alt={order.image} />
                                                </div>
                                            </td>
                                            <td className='table_content align-middle'>{order.name}</td>
                                            <td className='table_content align-middle'>{order.color}</td>
                                            <td className='table_content align-middle'>
                                                {order.category}
                                            </td>
                                            <td className='table_content align-middle'>{order.quantity}</td>
                                            <td className='table_content align-middle'>{order.brand}</td>
                                            <td className='table_content align-middle'>
                                                <PriceFormate price={order.price} />
                                            </td>
                                        </tr>


                                    )
                                })}
                                <tr>
                                    <td className='table_content align-middle fw-bold' colspan="6">Sub total</td>
                                    <td className='table_content align-middle' colspan="6">
                                        <PriceFormate price={orderDetail.subTotal / 100} />
                                    </td>

                                </tr>
                                <tr>
                                    <td className='table_content align-middle fw-bold' colspan="6">Shipping charges</td>
                                    <td className='table_content align-middle' colspan="6">
                                        <PriceFormate price={(orderDetail.total - orderDetail.subTotal) / 100} />
                                    </td>

                                </tr>
                                <tr>
                                    <td className='table_content align-middle fw-bold' colspan="6">total</td>
                                    <td className='table_content align-middle' colspan="6">
                                        <PriceFormate price={orderDetail.total / 100} />
                                    </td>

                                </tr>









                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default OrderInvoice
