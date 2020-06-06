import React from 'react';

import Page from 'shared/components/Page';
import Chart from './Chart';

const Dashboard = () => {
	return (
		<Page>
			<h1>Dashboard</h1>
			<h2>Latency [ms]</h2>
			<Chart></Chart>
			<h2>Speed [Mbps]</h2>
			<Chart></Chart>
		</Page>
	);
};

export default Dashboard;
