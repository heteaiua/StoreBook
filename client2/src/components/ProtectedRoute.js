import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../zustand/userStore';

const ProtectedRoute = ({element}) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? element : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;