import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from 'Auth/AuthProvider';

export const AdminRoute = ({ children, ...rest }: RouteProps) => {
    const authContext = useAuth();

    if (!authContext.isAuthenticated() || !authContext.isAdmin()) {
        return <Redirect to="/" />;
    }

    return <Route {...rest}>{children}</Route>;
};
