import React, { useEffect, useState } from 'react'
import RoleHeading from './RoleHeading'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { useSystem } from '../../Context/SystemUserContext';
import { useOtherUser } from '../../Context/OtherUserContext';
import { useRole } from '../../Context/RolesContext';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/store';





const SystemUserUpdate = () => {

  const { Filter_Permission } = useRole()
  const { getAdminData } = useSystem();
  const { getOtherUserData } = useOtherUser()
  const { id } = useParams()
  const [getPreviousData, setGetPreviousData] = useState({})
  let API = process.env.REACT_APP_API;
  const {authorizationToken} = useAuth();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await axios.get(`${API}/API/getIndividualAdminUserUpdate/${id}`, {
        headers: {
            Authorization: authorizationToken
        }
    });
      const resData = res.data;
      setGetPreviousData(resData.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData();

  }, [])

  const initialValues = {
    name: getPreviousData.name,
    email: getPreviousData.email,
    phone: getPreviousData.phone,
    address: getPreviousData.address,
    role: getPreviousData.role
  }

  const { values, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        await axios.put(`${API}/API/updateIndividualAdminUser/${id}`, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          role: values.role

        }, {
          headers: {
              Authorization: authorizationToken
          }
      })
        getAdminData();
        getOtherUserData();
        toast.success("Updated Successfully")
        navigate("/admin/systemUser")


      } catch (error) {
        console.log(error)

      }

    }
  })
  return (
    <section className='All_SystemUserUpdate_details'>
      <RoleHeading
        heading="Update System User"
        btnIcon=<IoIosArrowBack className='me-2' />
        btnContent="back"
        link="/admin/systemUser"
      />
      <div className='row SystemUserUpdate_Show mx-0'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input_group col-6">
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

          <div className="mb-3 input_group col-6">
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

          <div className="mb-3 input_group col-6">
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


          <div className="mb-3 input_group col-6">
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

          <div className="mb-3 input_group col-6">
            <label className="form-label">Role</label>
            <select class="form-select" name='role' value={values.role} onChange={handleChange}>
              {Filter_Permission.map((per, index) => {
                return (
                  <option value={per.role}>{per.role}</option>

                )
              })}

            </select>
          </div>
          <div className='btn-update col-6'>
            <button type='submit' className='btn btn-primary mt-3'>Update Now</button>

          </div>


        </form>

      </div>

    </section>
  )
}

export default SystemUserUpdate
