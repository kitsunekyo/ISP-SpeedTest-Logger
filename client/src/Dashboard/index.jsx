import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import api from 'shared/utils/api';
import { mbyte, avg, round } from 'shared/utils/math';
import Card from 'shared/components/Card';
import Chart from './Chart';
import ValueTile from './ValueTile';
import Sidebar from './Sidebar';
import { Content, Row, DashboardPage } from './style';

const readableAvg = _.flow([avg, round]);
const roundedMbit = _.flow([mbyte, round]);
const readableAvgMbit = _.flow([avg, roundedMbit]);

const Dashboard = () => {
	const [testResults, setTestResults] = useState([]);

	useEffect(() => {
		api.get('/speedtest').then(res => {
			setTestResults(res.data || []);
		});
	}, []);

	return (
		<DashboardPage>
			<Sidebar />
			<Content>
				<Row>
					<Card>
						<ValueTile
							title="Download"
							icon={null}
							unit={'mbit'}
							value={readableAvgMbit(testResults.map(obj => obj.download.bytes))}
						/>
					</Card>

					<Card>
						<ValueTile
							title="Upload"
							icon={null}
							unit={'mbit'}
							value={readableAvgMbit(testResults.map(obj => obj.upload.bytes))}
						/>
					</Card>

					<Card>
						<ValueTile
							title="Ping"
							icon={null}
							unit={'ms'}
							value={readableAvg(testResults.map(obj => obj.ping.latency))}
						/>
					</Card>

					<Card>
						<ValueTile
							title="Lost Packets"
							icon={null}
							unit={''}
							value={readableAvg(testResults.map(obj => obj.packetLoss))}
						/>
					</Card>
				</Row>

				<Row>
					<Card title="Internet Speed">
						<Chart
							group="speedtest"
							id="speed-graph"
							series={[
								{
									name: 'download (mbps)',
									data: testResults.map(result => {
										return [Date.parse(result.timestamp), roundedMbit(result.download.bytes)];
									}),
								},
								{
									name: 'upload (mbps)',
									data: testResults.map(result => {
										return [Date.parse(result.timestamp), roundedMbit(result.upload.bytes)];
									}),
								},
							]}
						/>
					</Card>
				</Row>

				<Card title="Ping">
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
				</Card>
			</Content>
		</DashboardPage>
	);
};

export default Dashboard;
