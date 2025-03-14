import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const RequireAuth = () => {
    // Retrieve user data from cookies (it was saved as JSON)
    const user = Cookies.get('user');

    // If user data exists, allow access via the Outlet,
    // otherwise redirect to landing page ("/")
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;