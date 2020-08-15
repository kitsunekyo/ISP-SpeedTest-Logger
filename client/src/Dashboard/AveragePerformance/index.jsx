import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';

import { ResultsContext } from '../ResultsContext';
import { avg, round, mbyte } from 'shared/utils/math';
import Card from 'shared/components/Card';
import ValueTile from '../ValueTile';

const readableAvg = flow([avg, round]);
const roundedMbit = flow([v => v * 8, mbyte, round]);
const readableAvgMbit = flow([avg, roundedMbit]);

const StyledAverage = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	grid-gap: 1rem;
`;

const AveragePerformance = () => {
	const { state, loadResults, setResults } = useContext(ResultsContext);

	const testResults = useMemo(() => {
		return state?.data?.length ? state.data : [];
	}, [state]);

	return (
		<StyledAverage>
			<Card>
				<ValueTile
					title="Download"
					icon={null}
					unit={'mbit'}
					value={readableAvgMbit(testResults.map(obj => obj.download.bandwidth))}
				/>
			</Card>
			<Card>
				<ValueTile
					title="Upload"
					icon={null}
					unit={'mbit'}
					value={readableAvgMbit(testResults.map(obj => obj.upload.bandwidth))}
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
		</StyledAverage>
	);
};

export default AveragePerformance;
