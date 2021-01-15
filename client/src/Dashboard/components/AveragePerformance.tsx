import React, { useContext } from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';

import { avg, round, mbyte } from 'shared/utils/math';
import Card from 'shared/components/Card';
import { resultsContext } from 'Dashboard/ResultsContext';
import ValueTile from 'Dashboard/components/ValueTile';

const readableAvg = flow([avg, round]);
const roundedMbit = flow([(v) => v * 8, mbyte, round]);
const readableAvgMbit = flow([avg, roundedMbit]);

const StyledAverage = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 1rem;
`;

const AveragePerformance = () => {
    const { results } = useContext(resultsContext);

    return (
        <StyledAverage>
            <Card>
                <ValueTile
                    title="Download"
                    icon={null}
                    unit={'mbit'}
                    value={readableAvgMbit(results.map((obj: any) => obj.download.bandwidth))}
                />
            </Card>
            <Card>
                <ValueTile
                    title="Upload"
                    icon={null}
                    unit={'mbit'}
                    value={readableAvgMbit(results.map((obj: any) => obj.upload.bandwidth))}
                />
            </Card>
            <Card>
                <ValueTile
                    title="Ping"
                    icon={null}
                    unit={'ms'}
                    value={readableAvg(results.map((obj: any) => obj.ping.latency))}
                />
            </Card>
            <Card>
                <ValueTile
                    title="Lost Packets"
                    icon={null}
                    unit={''}
                    value={readableAvg(results.map((obj: any) => obj.packetLoss))}
                />
            </Card>
        </StyledAverage>
    );
};

export default AveragePerformance;
