import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';

import api from 'shared/utils/api';
import Page from 'shared/components/Page';
import { mbyte, avg, round } from 'shared/utils/math';
import { color, size, text } from 'shared/utils/style';

const StyledDashboard = styled.div``;

const Average = styled.div``;

const Timestamp = styled.span`
	color: ${text.colorSecondary};
`;

const Dashboard = () => {
	const [testResults, setTestResults] = useState([]);
	const [speedChartData, setSpeedChartData] = useState({
		options: {
			chart: {
				id: 'speed-chart',
			},
			xaxis: {
				categories: [],
			},
		},
		series: [],
	});

	const [pingChartData, setPingChartData] = useState({
		options: {
			chart: {
				id: 'ping-chart',
			},
			xaxis: {
				categories: [],
			},
		},
		series: [],
	});

	const downloadResults = testResults.map(result => ({
		bytes: result.download.bytes,
		timestamp: result.timestamp,
	}));

	const uploadResults = testResults.map(result => ({
		bytes: result.upload.bytes,
		timestamp: result.timestamp,
	}));

	const pingResults = testResults.map(result => ({
		ms: result.ping.latency,
		timestamp: result.timestamp,
	}));

	useEffect(() => {
		api.get('/speedtest').then(res => {
			setTestResults(res.data || []);
			setSpeedChartData({
				options: {
					...speedChartData.options,
					xaxis: {
						categories: res.data.map(result => result.timestamp),
					},
				},
				series: [
					{
						name: 'download (mbps)',
						data: res.data.map(result => round(mbyte(result.download.bytes))),
					},
					{
						name: 'upload (mbps)',
						data: res.data.map(result => round(mbyte(result.upload.bytes))),
					},
				],
			});
			setPingChartData({
				options: {
					...pingChartData.options,
					xaxis: {
						categories: res.data.map(result => result.timestamp),
					},
				},
				series: [
					{
						name: 'ping (ms)',
						data: res.data.map(result => round(result.ping.latency)),
					},
				],
			});
		});
	}, []);

	return (
		<Page>
			<h1>Dashboard</h1>
			<StyledDashboard>
				<div>
					<h2>Download</h2>
					<Chart
						options={speedChartData.options}
						series={speedChartData.series}
						type="line"
						width="100%"
						height={320}
					/>
					<Chart
						options={pingChartData.options}
						series={pingChartData.series}
						type="line"
						width="100%"
						height={320}
					/>
					{downloadResults.map(res => (
						<div key={res.timestamp}>
							<Timestamp>{res.timestamp}</Timestamp> {round(mbyte(res.bytes))} Mbit
						</div>
					))}
				</div>
				<div>
					<h2>Upload</h2>
					{uploadResults.map(res => (
						<div key={res.timestamp}>
							<Timestamp>{res.timestamp}</Timestamp> {round(mbyte(res.bytes))} Mbit
						</div>
					))}
				</div>
				<div>
					<h2>Ping</h2>
					{pingResults.map(res => (
						<div key={res.timestamp}>
							<Timestamp>{res.timestamp}</Timestamp> {res.ms} ms
						</div>
					))}
				</div>
				<Average>
					<h2>Average Speed</h2>
					{round(mbyte(avg(testResults.map(obj => obj.download.bytes))))} Mbit
				</Average>
			</StyledDashboard>
		</Page>
	);
};

export default Dashboard;
