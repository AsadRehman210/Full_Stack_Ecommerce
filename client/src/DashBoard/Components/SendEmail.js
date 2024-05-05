import React, { useState } from 'react'
import RoleHeading from './RoleHeading'
import { IoIosArrowBack } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/store';


const SendEmail = () => {
    const [loading, setLoading] = useState(false);
    const {authorizationToken} = useAuth();
    const API = process.env.REACT_APP_API;

    const navigate = useNavigate()

    const initialValues = {
        subject: "",
        message: ""
    }
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                await axios.post(`${API}/API/Mailer/send_Mail`, {
                    subject: values.subject,
                    message: values.message

                }, {
                    headers: {
                        Authorization: authorizationToken
                    }
                })
                action.resetForm();
                toast.success("Email Send Successfully")
                navigate("/admin/subscriber")
                setLoading(false)
            } catch (error) {
                console.log(error.message)

            }

        }
    })
    return (
        <section className='send_Email'>
            <RoleHeading
                heading="Send Email"
                btnIcon=<IoIosArrowBack className='me-2' />
                btnContent="back"
                link="/admin/subscriber"
            />
            <div className='send_email_content'>
                <form onSubmit={handleSubmit}>
                    <div className='send_email_content_show'>
                        <div className='col-12 email_content'>
                            <div className="mb-3 email_content-group">
                                <label className="form-label">Subject *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter Your Subject'
                                    name="subject"
                                    value={values.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='col-12 email_content'>
                            <div className="mb-3 email_content-group">
                                <label className="form-label">Email Message *</label>

                                <textarea
                                    type="text"
                                    rows="6"
                                    className="form-control"
                                    placeholder='Enter Your Message'
                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='col-12 email_content d-flex justify-content-end'>
                            <button type='submit' className='btn btn-primary d-flex justify-content-center align-content-center  '>
                                <span className="me-3">Send Now</span>
                                {!loading ?
                                    <FaPaperPlane /> :
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}

                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default SendEmail
