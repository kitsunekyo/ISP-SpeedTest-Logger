import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthenticatedRoute } from 'shared/components/AuthenticatedRoute';
import Message from 'shared/components/Message';
import Dashboard from 'Dashboard/pages';
import { Login } from 'Auth/Login';
import { AdminRoute } from 'shared/components/AdminRoute';

export const AppRoutes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/login" component={Login} />
            <AuthenticatedRoute path="/dashboard" component={Dashboard} />
            <AdminRoute path="/admin">
                <h1>admin route</h1>
            </AdminRoute>
            <Route>
                <Message title="404 Page not found" />
            </Route>
        </Switch>
    );
};
