import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Message from 'shared/components/Message';
import DashboardView from 'Dashboard';
import AuthView from 'Auth';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Redirect exact from="/" to="/dashboard" />
				<Route path="/auth" component={AuthView} />
				<Route path="/dashboard" component={DashboardView} />
				<Route>
					<Message title="404 Page not found" />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
