import React from 'react'
import RoleHeading from './RoleHeading'
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from 'formik';
import axios from 'axios';
import { useRole } from '../../Context/RolesContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/store';

const RoleCreate = () => {
    const { getRole } = useRole()
    const API = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    let initialValues = {
        role: "",
        permissions: []
    }
    console.log(initialValues)
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,

        onSubmit: async (values) => {
            try {
                const updatedPermissions = values.permissions.map(permission => permission.replace(/-/g, ' '));


                await axios.post(`${API}/API/Permission/createPermission`, {
                    role: values.role,
                    permissions: updatedPermissions
                }, {
                    headers: {
                        Authorization: authorizationToken
                    }
                })
                getRole();
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
                heading="Create Role and Permissions"
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
                                <input type="text" className="form-control" name="role" value={values.role} onChange={handleChange} />
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
                                    checked={values.permissions.includes(permission)}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label' htmlFor={permission}>{permission.replace(/-/g, ' ')} </label>
                            </div>
                        ))}

                        <div className='col-4 role-col'>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </section>

    )

}

export default RoleCreate
