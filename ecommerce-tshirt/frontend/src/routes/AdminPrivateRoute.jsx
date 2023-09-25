import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export default function AdminPrivateRoute({ children }) {

    const token = !!localStorage.getItem('token');
    const { user } = useContext(AuthContext)

    return (
        token && user?.role === 1 ? <>{children}</> : <Navigate to={"/"} />
    )
}
