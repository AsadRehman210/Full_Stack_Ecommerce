import React from 'react'
import { TiSocialTwitterCircular } from "react-icons/ti";
import { BsInstagram } from "react-icons/bs";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { FaFacebookMessenger } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';


const Footer = () => {
    const API = process.env.REACT_APP_API;

    const initialValues = {
        email: ""
    }
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post(`${API}/subscriber/list`, {
                    email: values.email
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                resetForm();
            } catch (error) {
                console.log(`Error: ${error}`)

            }

        }
    })
    return (
        <footer className='footercom' >
            <section className='footer_1'>
                <div className='container'>
                    <div className='row footer_1_row'>
                        <div className='col-12 footer_1_col'>
                            <div className='footer-1 footer_1_content'>
                                <h3>Ready to get Started?</h3>
                                <p>Talk to Us Today</p>
                            </div>
                            <div className='footer_1_btn'>
                                <NavLink to="/contact" className="btn btn-primary">Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className='main_footer'>
                <div className='container'>
                    <div className='row main_footer_row'>
                        <div className='col-lg-3 col-6 main_footer_col_1'>
                            <h3>Asad Ecommerce</h3>
                            <p>Discover endless possibilities with our curated selection of products at unbeatable prices.</p>
                        </div>

                        <div className='col-lg-3 col-6 main_footer_col_2'>
                            <h3>Subscribe to get important updates</h3>
                            <form onSubmit={handleSubmit}>
                                <input type="email"
                                    placeholder='Enter Your Email'
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange} required />
                                <button type='submit' className='btn btn-primary w-50'>Subscribe</button>
                            </form>
                        </div>

                        <div className='col-lg-3 col-6 main_footer_col_3'>
                            <h3>Follow us</h3>
                            <div className='social_icon'>
                                <a href='https://www.linkedin.com/in/asadrehman210/' target='_blank' rel='noopener noreferrer'><TiSocialTwitterCircular /></a>
                                <a href='https://www.linkedin.com/in/asadrehman210/' target='_blank' rel='noopener noreferrer'><BsInstagram /></a>
                                <a href='https://www.linkedin.com/in/asadrehman210/' target='_blank' rel='noopener noreferrer'><TiSocialLinkedinCircular /></a>
                                <a href='https://www.linkedin.com/in/asadrehman210/' target='_blank' rel='noopener noreferrer'><FaFacebookMessenger /></a>

                            </div>
                        </div>

                        <div className='col-lg-3 col-6 main_footer_col_4 w-md-50'>
                            <h3>Call Us</h3>
                            <div className='footer_call'>
                                <a href="tel:03086225650" >+92 308 6225650</a>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr className='text-white ' />

            <section className='footer_bottom'>
                <div className='container'>
                    <div className='row footer_bottom_row'>
                        <div className='col-12 footer_bottom_col'>
                            <p>@2024 Asad Rehman. All Rights Reserved</p>
                            <p>Privacy, Term & Condition</p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer
