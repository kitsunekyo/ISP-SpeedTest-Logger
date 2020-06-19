import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Play as PlayIcon } from 'react-feather';

import useApi from 'shared/hooks/api';
import { mbyte, avg, round } from 'shared/utils/math';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import { Row, Col } from 'shared/components/Layout';
import Chart from './Chart';
import ValueTile from './ValueTile';
import Sidebar from './Sidebar';
import { Content, DashboardPage, SectionTitle } from './style';

const readableAvg = _.flow([avg, round]);
const roundedMbit = _.flow([mbyte, round]);
const readableAvgMbit = _.flow([avg, roundedMbit]);

const Dashboard = () => {
	const [testResultState, getTestResults, setLocalTestResults] = useApi('/speedtest');
	const [speedtestState, runSpeedtest] = useApi('/speedtest', 'post');

	const testResults = useMemo(() => {
		return testResultState?.data?.length ? testResultState.data : [];
	}, [testResultState]);

	const handleRunSpeedtest = () =>
		runSpeedtest().then(res => setLocalTestResults([...testResultState.data, res.data]));

	useEffect(() => {
		getTestResults();
	}, []);

	return (
		<DashboardPage>
			<Sidebar />
			<Content>
				<Row>
					<Col>
						<h1>Network Quality Dashboard</h1>
					</Col>
				</Row>
				<Button
					onClick={handleRunSpeedtest}
					icon={<PlayIcon size={14} />}
					isWorking={speedtestState.isLoading}
				>
					Run Speedtest
				</Button>
				<SectionTitle>Average Performance</SectionTitle>
				<Row>
					<Col>
						<Card>
							<ValueTile
								title="Download"
								icon={null}
								unit={'mbit'}
								value={readableAvgMbit(testResults.map(obj => obj.download.bytes))}
							/>
						</Card>
					</Col>
					<Col>
						<Card>
							<ValueTile
								title="Upload"
								icon={null}
								unit={'mbit'}
								value={readableAvgMbit(testResults.map(obj => obj.upload.bytes))}
							/>
						</Card>
					</Col>
					<Col>
						<Card>
							<ValueTile
								title="Ping"
								icon={null}
								unit={'ms'}
								value={readableAvg(testResults.map(obj => obj.ping.latency))}
							/>
						</Card>
					</Col>
					<Col>
						<Card>
							<ValueTile
								title="Lost Packets"
								icon={null}
								unit={''}
								value={readableAvg(testResults.map(obj => obj.packetLoss))}
							/>
						</Card>
					</Col>
				</Row>

				<SectionTitle>Test History</SectionTitle>
				<Row>
					<Col>
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
					</Col>
				</Row>

				<Row>
					<Col>
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
					</Col>
				</Row>
			</Content>
		</DashboardPage>
	);
};

export default Dashboard;
