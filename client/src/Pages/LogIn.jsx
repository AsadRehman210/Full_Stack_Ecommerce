import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useAuth } from '../Context/store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
  const { storeTokenInLS, StoreUserPermission, storeLoginUserData, AdminLogin } = useAuth();

  const API = process.env.REACT_APP_API;
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: ""
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post(`${API}/API/auth/Login`, {
          email: values.email,
          password: values.password
        })
        const getResult = res.data;
        storeTokenInLS(getResult.token);
        storeLoginUserData(getResult.userDetail._id, getResult.userDetail.email);
        
        if(getResult.userDetail.role !== "user"){
          console.log(getResult.userDetail.role)
          AdminLogin(getResult.userDetail.role)
        }

       
        let userObject = getResult.userDetail
        const flattenedPermissions = userObject.permission.flatMap(obj => obj.permissions);
        // console.log(flattenedPermissions);

        StoreUserPermission(flattenedPermissions)

        action.resetForm();
        toast.success("Login Successfully");
        navigate("/")

      } catch (error) {
        console.log(`Error : ${error}`)

      }

    }
  })
  return (
    <main>
      <section className='login_section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-12 login_img order-lg-1 order-2'>
              <img src={process.env.PUBLIC_URL + "/images/login.webp"} alt='login_image' />

            </div>
            <div className='col-lg-4 m-auto col-12 order-lg-2 order-1 login_content'>
              <h3>Login Form</h3>
              <form onSubmit={handleSubmit}>
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
                <button type='submit' className='btn btn-primary mt-3'>Login Now</button>
              </form>


            </div>
          </div>
        </div>

      </section>
    </main>
  )
}

export default LogIn
