import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Chart from './Chart';
import { ResultsContext } from '../ResultsContext';
import { round, mbyte } from 'shared/utils/math';
import Card from 'shared/components/Card';

const Charts = styled.div`
	> *:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

const roundedMbit = _.flow([v => v * 8, mbyte, round]);

const TestHistory = () => {
	const { state, loadResults, setResults } = useContext(ResultsContext);

	const testResults = useMemo(() => {
		return state?.data?.length ? state.data : [];
	}, [state]);

	return (
		<Charts>
			<Card title="Bandwidth">
				<Chart
					group="speedtest"
					id="speed-graph"
					series={[
						{
							name: 'download (mbps)',
							data: testResults.map(result => {
								return [Date.parse(result.timestamp), roundedMbit(result.download.bandwidth)];
							}),
						},
						{
							name: 'upload (mbps)',
							data: testResults.map(result => {
								return [Date.parse(result.timestamp), roundedMbit(result.upload.bandwidth)];
							}),
						},
					]}
				/>
			</Card>
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
		</Charts>
	);
};

export default TestHistory;
