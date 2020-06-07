import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import PageError from 'shared/components/PageError';
import Dashboard from 'Dashboard';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Redirect exact from="/" to="/dashboard" />
				<Route path="/dashboard" component={Dashboard} />
				<Route component={PageError} />
			</Switch>
		</Router>
	);
};

export default Routes;
