import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AlreadySigned = () => {
    // Retrieve user data from cookies (it was saved as JSON)
    const user = Cookies.get('user');

    return user ? <Navigate to="/home" replace /> : <Outlet/>;
};

export default AlreadySigned;