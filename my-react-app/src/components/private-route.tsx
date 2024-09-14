import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const location = useLocation();
    
    if (!isAuthenticated()) {
        return <Navigate to="/api/auth/login" state={{ from: location }} replace />;
    }

    return element;
};

export default PrivateRoute;
