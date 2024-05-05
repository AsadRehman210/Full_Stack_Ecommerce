import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiMenu3Line } from "react-icons/ri";
import { FaProductHunt, FaFirstOrder } from "react-icons/fa6";
import { FaUserCog, FaUser } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { RiFileList3Fill } from "react-icons/ri";
import { useOtherUser } from '../../Context/OtherUserContext';
import { useSystem } from '../../Context/SystemUserContext';
import { toast } from 'react-toastify';
import { useSubscriber } from '../../Context/SubscriberContext';
import { useRole } from '../../Context/RolesContext';
import { useAuth } from '../../Context/store';
import { usePendingOrder } from '../../Context/PendingOrderContext';
import { useOrder } from '../../Context/AllOrderContext';
import { useDeliveredOrder } from '../../Context/DeliveredOrderContext';
import { useStockOut } from '../../Context/StockOutContext';


const Menu = () => {
    const { permissionArray } = useAuth();
    const { getRole } = useRole();
    const { getEmail } = useSubscriber();
    const { getOtherUserData } = useOtherUser();
    const { getAdminData } = useSystem();
    const { getAllOrder } = useOrder();
    const { getAllPendingOrder } = usePendingOrder();
    const { getAllDeliveredOrder } = useDeliveredOrder();
    const { getFilteredStockOut } = useStockOut()
    const [menuOpen, setMenuOpen] = useState(false);
    const [buttonStates, setButtonStates] = useState({
        managedProducts: false,
        managedOrder: false,
        account: false
    });

    const toggleButtonState = (buttonName) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [buttonName]: !prevState[buttonName]
        }));
    };

    // Function to toggle the menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();

    // Function to close the menu
    const closeMenu = (link, callback) => {
        setMenuOpen(false);
        navigate(link);

        if (callback) {
            callback();
        }


    };



    return (
        <div className="flex-shrink-0 p-3 dashBoard_page_menu">

            <nav className="navbar DB_navbar navbar-expand-lg d-flex flex-column ">
                <div className="container d-lg-flex flex-lg-column d-flex flex-row justify-content-between">

                    <NavLink to="/admin" className="navbar-brand nav_brand d-flex align-items-center pb-lg-3   mb-lg-3 link-body-emphasis text-decoration-none dashBoard_Heading">
                        <div className='logo_design'>A <span>S</span></div>
                        <div className='logo_content m-auto'>
                            <p>Admin </p>
                            <p> Administrator</p>
                        </div>
                    </NavLink>
                    <button
                        className="navbar-toggler toggle_btn dashBoard_btn"
                        type="button"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar">
                        <span ><RiMenu3Line /> </span>
                    </button>
                    <div className={`offcanvas  offcanvas-end ${menuOpen ? 'show' : ''}`} tabIndex="-1"

                        id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header border-bottom">

                            <NavLink to="/admin" className="navbar-brand nav_brand d-flex align-items-center pb-lg-3   mb-lg-3 link-body-emphasis text-decoration-none dashBoard_Heading" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/admin')}>
                                <div className='logo_design'>A <span>S</span></div>
                                <div className='logo_content m-auto'>
                                    <p>Admin </p>
                                    <p> Administrator</p>
                                </div>
                            </NavLink>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav flex-column list-unstyled">
                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed pe-0" data-bs-toggle="collapse" data-bs-target="#Products-collapse" aria-expanded="false" onClick={() => toggleButtonState('managedProducts')}>
                                        <FaProductHunt style={{ color: "blue" }} className='me-3' /> Managed Products
                                        {buttonStates.managedProducts ?
                                            <IoMdArrowDropup className='me-auto' /> : <IoMdArrowDropdown className='me-auto' />}


                                    </button>
                                    <div className="collapsed collapse" id="Products-collapse" >
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><NavLink to="DBAllProducts" className='link-dark d-inline-flex text-decoration-none rounded' data-bs-dismiss="offcanvas" onClick={() => closeMenu('/admin')}>All Products</NavLink></li>

                                            <li><NavLink to="DBProductCategory" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('DBProductCategory')}>Product Categories</NavLink></li>

                                            <li><NavLink to="stockOutProducts" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('stockOutProducts', getFilteredStockOut)}>Stock Out Products</NavLink></li>

                                            <li><NavLink
                                                to="addProducts"
                                                className="link-dark d-inline-flex text-decoration-none rounded"
                                                data-bs-dismiss="offcanvas"
                                                onClick={() => {

                                                    if (!permissionArray.includes("product create")) {
                                                        toast.error("You are not authorized to perform this action.");


                                                    }
                                                    closeMenu('addProducts');


                                                }}
                                            >Add Products</NavLink></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed pe-0" data-bs-toggle="collapse" data-bs-target="#order-collapse" aria-expanded="false" onClick={() => toggleButtonState('managedOrder')}>
                                        <FaFirstOrder style={{ color: "blue" }} className='me-3' />
                                        Managed Order
                                        {buttonStates.managedOrder ?
                                            <IoMdArrowDropup className='me-auto' /> : <IoMdArrowDropdown className='me-auto' />}


                                    </button>
                                    <div className="collapsed collapse" id="order-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><NavLink to="allOrders" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('allOrders', getAllOrder)}>All Order</NavLink></li>

                                            <li><NavLink to="pendingOrders" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('pendingOrders', getAllPendingOrder)}>Pending Orders</NavLink></li>

                                            <li><NavLink to="deliveredOrders" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('deliveredOrders', getAllDeliveredOrder)}>Delivered Orders</NavLink></li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed pe-0" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-expanded="false" onClick={() => toggleButtonState('managedUser')}>
                                        <FaUserCog style={{ color: "blue" }} className='me-3' />
                                        Managed User
                                        {buttonStates.managedUser ?
                                            <IoMdArrowDropup className='me-auto' /> : <IoMdArrowDropdown className='me-auto' />}


                                    </button>
                                    <div className="collapsed collapse" id="user-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><NavLink to="roles" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('roles', getRole)}>Roles</NavLink></li>

                                            <li><NavLink to="systemUser" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('systemUser', getAdminData)}>System User</NavLink></li>

                                            <li><NavLink to="OtherUser" className="link-dark d-inline-flex text-decoration-none rounded" data-bs-dismiss="offcanvas" onClick={() => closeMenu('OtherUser', getOtherUserData)}>Other User</NavLink></li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="mb-1 d-flex align-items-center'">
                                    <NavLink to="subscriber" className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-dismiss="offcanvas" onClick={() => closeMenu('subscriber', getEmail)}>
                                        <RiFileList3Fill style={{ color: "blue" }} className='me-3' />
                                        Subscriber List
                                    </NavLink>

                                </li>
                                <li className="border-top my-3"></li>
                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed pe-0" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false" onClick={() => toggleButtonState('account')}>
                                        <FaUser style={{ color: "blue" }} className='me-3' />
                                        Account
                                        {buttonStates.account ?
                                            <IoMdArrowDropup className='me-auto' /> : <IoMdArrowDropdown className='me-auto' />}


                                    </button>
                                    <div className="collapsed collapse" id="account-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li><NavLink to="/" className="link-dark d-inline-flex text-decoration-none rounded">Home</NavLink></li>

                                            <li><NavLink to="/about" className="link-dark d-inline-flex text-decoration-none rounded">About</NavLink></li>

                                            <li><NavLink to="/products" className="link-dark d-inline-flex text-decoration-none rounded" >Products</NavLink></li>

                                            <li><NavLink to="/contact" className="link-dark d-inline-flex text-decoration-none rounded" >Contact</NavLink></li>

                                            <li><NavLink to="/logout" className="link-dark d-inline-flex text-decoration-none rounded" >Sign out</NavLink></li>
                                        </ul>
                                    </div>
                                </li>



                            </ul>
                        </div>
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default Menu