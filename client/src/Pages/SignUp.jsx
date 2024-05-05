import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    let API = process.env.REACT_APP_API;
    let navigate = useNavigate(); 

    let initialValues = {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    }

    let { values, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, action) => {
            try {
                await axios.post(`${API}/API/auth/registeration`, {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    address: values.address

                })
                action.resetForm();
                navigate("/login")

            } catch (error) {
                console.log(`Error : ${error.message}`)

            }

        }
    })

    return (
        <main>
            <section className='register_section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 col-12 order-lg-1 order-2 reg_image'>
                            <img src={process.env.PUBLIC_URL + "/images/register.webp"} alt='registration' />
                        </div>
                        <div className='col-lg-5 col-12 order-lg-2 order-1 reg_content m-auto '>
                            <h3>Registration Form</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 input_group">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name='name'
                                        value={values.name}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter the Username"
                                        required
                                    />
                                </div>

                                <div className="mb-3 input_group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter the Email"
                                        required
                                    />
                                </div>

                                <div className="mb-3 input_group">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        name='phone'
                                        value={values.phone}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter the Phone"
                                        required
                                    />
                                </div>

                                <div className="mb-3 input_group">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter the Password"
                                        required
                                    />
                                </div>

                                <div className="mb-3 input_group">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        name='address'
                                        value={values.address}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter the Password"
                                        required
                                    />
                                </div>

                                <button type='submit' className='btn btn-primary mt-3'>Register Now</button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SignUp
