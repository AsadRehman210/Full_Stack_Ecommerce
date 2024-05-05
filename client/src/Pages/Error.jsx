import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Error = () => {
    let navigate = useNavigate()
    return (
        <main>
            <section className='Error_section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 err_content'>
                            <p className='err_404'>404</p>
                            <h4>Sorry! Page Not Found</h4>
                            <p className='para'>Oops! It seems like the page you're looking for has taken a detour. Please check the URL or navigate back to explore more. If you need assistance, feel free to visit our homepage or contact our support team. We apologize for any inconvenience.</p>
                            <div className='button'>
                                <NavLink className="btn btn-primary btn1" onClick={navigate(-1)}>Go To Back</NavLink>

                                <NavLink to="/contact" className="btn btn-outline-primary btn1">Report Problem</NavLink>

                                <NavLink to="/" className="btn btn-primary btn2">Go To HomePage</NavLink>

                                
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Error
