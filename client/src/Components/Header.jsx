import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { RiMenu3Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/store';

const Header = () => {
    const { permissionArray } = useAuth();

    const { isLoggedIn } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const { total_item } = useCart()

    // Function to toggle the menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();

    // Function to close the menu
    const closeMenu = (link) => {
        setMenuOpen(false);
        navigate(link);
    };
    return (
        <header>
            <nav className="navbar main_navbar navbar-expand-lg ">
                <div className="container">
                    <NavLink className="navbar-brand nav_brand" to="/">
                        <span className='text-white'>Asad</span> Store
                    </NavLink>
                    <button className="navbar-toggler toggle_btn" type="button" aria-label="Toggle navigation" onClick={toggleMenu} data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span ><RiMenu3Line /> </span>
                    </button>
                    <div className={`offcanvas offcanvas-end w-50 ${menuOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/')}>Asad Rehman</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-4">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/')}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/about')}>About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/products" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/products')}>Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/contact')}>Contact</NavLink>
                                </li>
                                {isLoggedIn ?
                                    permissionArray.includes("dashboard access") ?
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/admin" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/admin')} >Admin</NavLink>
                                            </li>

                                            <li className="nav-item">
                                                <NavLink to="/logout" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/logout')} >Logout</NavLink>
                                            </li>
                                        </> :
                                        <li className="nav-item">
                                            <NavLink to="/logout" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/logout')} >Logout</NavLink>
                                        </li>

                                    :

                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/signup" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/signup')} >Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/login')} >Login</NavLink>
                                        </li>
                                    </>}


                                <li className="nav-item">
                                    <NavLink to="/cart" className="nav-link" data-bs-dismiss="offcanvas" onClick={() => closeMenu('/cart')} ><IoCartOutline />
                                        <span>{total_item}</span>
                                    </NavLink>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header