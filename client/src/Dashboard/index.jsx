import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from 'shared/utils/api';
import Page from 'shared/components/Page';
import { mbyte, avg, round } from 'shared/utils/math';
import Chart from './Chart';

const ChartTitle = styled.div`
	display: inline-flex;
	align-items: center;
	> *:not(:last-child) {
		margin-right: 0.5rem;
	}
	> i {
		margin: 0.5rem;
	}
`;

const Dashboard = () => {
	const [testResults, setTestResults] = useState([]);

	useEffect(() => {
		api.get('/speedtest').then(res => {
			setTestResults(res.data || []);
		});
	}, []);

	return (
		<Page>
			<ChartTitle>
				<i className="material-icons">network_check</i>
				<span>speed avg:</span>
				<span>
					{round(mbyte(avg(testResults.map(obj => obj.download.bytes))))}/
					{round(mbyte(avg(testResults.map(obj => obj.upload.bytes))))} mbit
				</span>
			</ChartTitle>

			<Chart
				group="speedtest"
				id="speed-graph"
				series={[
					{
						name: 'download (mbps)',
						data: testResults.map(result => {
							return [Date.parse(result.timestamp), round(mbyte(result.download.bytes))];
						}),
					},
					{
						name: 'upload (mbps)',
						data: testResults.map(result => {
							return [Date.parse(result.timestamp), round(mbyte(result.upload.bytes))];
						}),
					},
				]}
			/>

			<ChartTitle>
				<i className="material-icons">speed</i>
				<span>ping avg:</span>
				<span>{round(avg(testResults.map(obj => obj.ping.latency)))} ms</span>
			</ChartTitle>

			<Chart
				group="speedtest"
				id="ping-graph"
				series={[
					{
						name: 'ping (ms)',
						data: testResults.map(result => {
							return [Date.parse(result.timestamp), round(result.ping.latency)];
						}),
					},
				]}
			/>
		</Page>
	);
};

export default Dashboard;
