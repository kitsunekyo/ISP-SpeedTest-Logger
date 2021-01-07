import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Message from 'shared/components/Message';
import { DashboardPage } from 'Dashboard/pages';
import { Login } from 'Auth/Login';

const AppRoutes = () => {
	return (
		<Switch>
			<Redirect exact from="/" to="/dashboard" />
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={DashboardPage} />
			<Route>
				<Message title="404 Page not found" />
			</Route>
		</Switch>
	);
};

export default AppRoutes;
