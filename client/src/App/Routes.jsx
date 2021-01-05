import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Message from 'shared/components/Message';
import DashboardView from 'Dashboard';
import { Login } from '../Auth/Login';

const Routes = () => {
	return (
		<Switch>
			<Redirect exact from="/" to="/dashboard" />
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={DashboardView} />
			<Route>
				<Message title="404 Page not found" />
			</Route>
		</Switch>
	);
};

export default Routes;
