import React from 'react';

import Dashboard from 'Dashboard/components/Dashboard';
import Sidebar from 'Dashboard/components/Sidebar';
import { ResultsProvider } from 'Dashboard/ResultsContext';

export const DashboardPage = () => {
	return (
		<ResultsProvider>
			<Sidebar></Sidebar>
			<Dashboard></Dashboard>
		</ResultsProvider>
	);
};
