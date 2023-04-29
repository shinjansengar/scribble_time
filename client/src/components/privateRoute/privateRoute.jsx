import React from 'react'
import userData from '../../utils/userData';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const username = userData.getData("username");
    return username ? children : <Navigate to="/" replace/>
}

export default PrivateRoute;