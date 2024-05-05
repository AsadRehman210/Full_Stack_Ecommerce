import React, { useEffect } from 'react'
import { useAuth } from '../Context/store'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogOut = () => {
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser();
        toast.success("Logout Successfully")
    }, [logoutUser]);

    return <Navigate to="/login" />
}

export default LogOut
