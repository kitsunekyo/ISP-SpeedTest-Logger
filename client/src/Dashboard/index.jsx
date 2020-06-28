import React, { useEffect, useMemo, useContext } from 'react';
import _ from 'lodash';
import { Play as PlayIcon } from 'react-feather';

import ToasterContext from 'shared/components/Toaster/Context';
import useApi from 'shared/hooks/api';
import { mbyte, avg, round } from 'shared/utils/math';
import Card from 'shared/components/Card';
import Button from 'shared/components/Button';
import { Row, Col } from 'shared/components/Layout';
import Chart from './Chart';
import ValueTile from './ValueTile';
import Sidebar from './Sidebar';
import ScheduleSelector from './ScheduleSelector';
import { Content, DashboardPage, SectionTitle, PageTitle } from './style';

const readableAvg = _.flow([avg, round]);
const roundedMbit = _.flow([mbyte, round]);
const readableAvgMbit = _.flow([avg, roundedMbit]);

const Dashboard = () => {
	const toaster = useContext(ToasterContext);

	const [testResultState, getTestResults, setLocalTestResults] = useApi('/speedtest');
	const [speedtestState, runSpeedtest] = useApi('/speedtest', 'post');

	const [scheduleState, getSchedule, setLocalSchedule] = useApi('/speedtest/schedule', 'get');
	const [, setSchedule] = useApi('/speedtest/schedule', 'post');

	const testResults = useMemo(() => {
		return testResultState?.data?.length ? testResultState.data : [];
	}, [testResultState]);

	const handleRunSpeedtest = async () => {
		try {
			toaster.sendToast('Started Speedtest', 'This might take a few minutes');
			const res = await runSpeedtest();
			setLocalTestResults([...testResultState.data, res.data.data]);
			toaster.sendToast('Speedtest complete');
		} catch (e) {
			console.error('error running speedtest', e);
		}
	};

	const handleSetSchedule = async value => {
		try {
			await setSchedule(value);
			setLocalSchedule(parseInt(value));
			toaster.sendToast('Auto Speedtest updated');
		} catch (e) {
			console.error('error trying to update speedtest schedule', e);
		}
	};

	useEffect(() => {
		getTestResults();
		getSchedule();
	}, []);

	return (
		<DashboardPage>
			<Sidebar />
			<Content>
				<PageTitle>Network Quality Dashboard</PageTitle>
				<div>
					<ScheduleSelector
						onChange={handleSetSchedule}
						value={scheduleState.data}
						style={{ margin: '1rem 0' }}
					/>
					<Button
						onClick={handleRunSpeedtest}
						icon={<PlayIcon size={14} />}
						isWorking={speedtestState.isLoading}
					>
						Run Speedtest Now
					</Button>
				</div>
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
