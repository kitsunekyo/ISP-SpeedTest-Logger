import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from 'Auth/AuthProvider';

export const AuthenticatedRoute = ({ children, ...rest }: RouteProps) => {
    const authContext = useAuth();

    if (!authContext.isAuthenticated()) {
        return <Redirect to="/login" />;
    }

    return <Route {...rest}>{children}</Route>;
};
