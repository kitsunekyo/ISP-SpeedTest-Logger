import React, { useContext } from 'react';
import { Loader, AlertOctagon } from 'react-feather';

import { StyledDashboard, SectionTitle, PageTitle } from './style';
import Message from 'shared/components/Message';
import Speedtest from './Speedtest';
import ScheduleSelector from './ScheduleSelector';
import { ResultsContext } from './ResultsContext';
import AveragePerformance from './AveragePerformance';
import TestHistory from './TestHistory';

const Dashboard = () => {
	const { state } = useContext(ResultsContext);

	if (state.isLoading) return <Message title="Loading speedtest results" icon={<Loader />} />;
	if (state.error)
		return <Message title="Error loading speedtest results" icon={<AlertOctagon />} />;

	return (
		<StyledDashboard>
			<PageTitle>Network Quality Dashboard</PageTitle>
			<Speedtest />

			<SectionTitle>Automated Speedtest</SectionTitle>
			<ScheduleSelector />

			<SectionTitle>Average Performance</SectionTitle>
			<AveragePerformance />

			<SectionTitle>Test History</SectionTitle>
			<TestHistory />
		</StyledDashboard>
	);
};

export default Dashboard;
