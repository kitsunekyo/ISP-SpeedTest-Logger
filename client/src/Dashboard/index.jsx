import React from 'react';

import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import { ResultsProvider } from './ResultsContext';

const DashboardView = () => {
	return (
		<ResultsProvider>
			<Sidebar />
			<Dashboard />
		</ResultsProvider>
	);
};

export default DashboardView;
