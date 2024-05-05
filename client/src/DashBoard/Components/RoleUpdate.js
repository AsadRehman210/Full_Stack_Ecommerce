import React, { useEffect, useState } from 'react'
import RoleHeading from './RoleHeading'
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRole } from '../../Context/RolesContext';
import { useAuth } from '../../Context/store';


const RoleUpdate = () => {
    const { getRole } = useRole()
    const [roleData, setRoleData] = useState({});
    const API = process.env.REACT_APP_API;
    const { id } = useParams();
    const navigate = useNavigate();
    let {authorizationToken} = useAuth();


    const getPermissions = async () => {
        try {
            const res = await axios.get(`${API}/API/Permission/getIndividualPermission/${id}`, {
                headers: {
                    Authorization: authorizationToken
                }
            });
            const resData = await res.data;
            setRoleData(resData.message)

        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getPermissions();

    }, []);

    let { role, permissions } = roleData;
    permissions = permissions?.map(permission => permission.replace(/ /g, '-'))

    let initialValues = {
        role: role || "",
        permissions: permissions
    }
    console.log(initialValues)
    let { values, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        onSubmit: async (values) => {
            try {
                let updatedPermissions = values.permissions.map(permission => permission.replace(/-/g, ' '));

                await axios.put(`${API}/API/Permission/updatePermission/${id}`, {
                    role: values.role,
                    permissions: updatedPermissions
                }, {
                    headers: {
                        Authorization: authorizationToken
                    }
                })
                getRole()
                navigate("/admin/roles")
            } catch (error) {
                console.log(error.message)

            }

        }

    });
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedPermissions = [...values.permissions];
        if (checked) {
            updatedPermissions.push(value);
        } else {
            updatedPermissions = updatedPermissions.filter((permission) => permission !== value);
        }
        handleChange({
            target: {
                name: 'permissions',
                value: updatedPermissions
            }
        });
    };



    return (
        <section className='Role_update'>
            <RoleHeading
                heading="Update Permissions"
                btnIcon=<IoIosArrowBack className='me-2' />
                btnContent="back"
                link="/admin/roles"
            />
            <div className='role_show'>
                <form onSubmit={handleSubmit}>
                    <div className='row role-row'>
                        <div className='col-12 role-col-main'>
                            <div className="mb-3 role-name-group">
                                <label className="form-label">Role's Name*</label>
                                <input type="text" className="form-control" name="role" value={values.role} onChange={handleChange} disabled />
                            </div>
                        </div>

                        {/* Checkboxes */}
                        {[
                            'make-payment',
                            'dashboard-access',
                            'product-create',
                            'product-view',
                            'product-update',
                            'product-delete',
                            'stock-out-products-view',
                            'category-view',
                            'category-delete',
                            'all-order-view',
                            'order-delete',
                            'order-invoice-view',
                            'pending-order-view',
                            'delivered-order-view',
                            'role-create',
                            'role-view',
                            'role-update',
                            'role-delete',
                            'admin-user-view',
                            'admin-user-update',
                            'admin-user-delete',
                            'other-user-view',
                            'other-user-update',
                            'other-user-delete',
                            'subscriber-view',
                            'subscriber-delete',
                            'email-send-to-all-subscriber'
                        ].map((permission, index) => (
                            <div key={index} className='col-4 role-col'>
                                <input
                                    className='form-check-input me-3 mt-0'
                                    type='checkbox'
                                    name='permissions'
                                    value={permission}
                                    id={permission}
                                    checked={values.permissions?.includes(permission)}
                                    onChange={handleCheckboxChange}
                                />
                                <label
                                    className='form-check-label'
                                    htmlFor={permission}
                                >
                                    {permission.replace(/-/g, ' ')}
                                </label>
                            </div>
                        ))}

                        <div className='col-4 role-col'>
                            <button type='submit' className='btn btn-primary'>Updated Now</button>
                        </div>
                    </div>
                </form>
            </div>

        </section>

    )
}

export default RoleUpdate;