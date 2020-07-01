import React from 'react';

import Speedtest from './Speedtest';
import Sidebar from './Sidebar';
import ScheduleSelector from './ScheduleSelector';
import { Content, DashboardPage, SectionTitle, PageTitle } from './style';
import { ResultsProvider } from './ResultsContext';
import AveragePerformance from './AveragePerformance';
import TestHistory from './TestHistory';

const Dashboard = () => {
	return (
		<ResultsProvider>
			<DashboardPage>
				<Sidebar />
				<Content>
					<PageTitle>Network Quality Dashboard</PageTitle>
					<Speedtest />

					<SectionTitle>Automated Speedtest</SectionTitle>
					<ScheduleSelector />

					<SectionTitle>Average Performance</SectionTitle>
					<AveragePerformance />

					<SectionTitle>Test History</SectionTitle>
					<TestHistory />
				</Content>
			</DashboardPage>
		</ResultsProvider>
	);
};

export default Dashboard;
