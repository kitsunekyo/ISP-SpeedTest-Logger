import React, { useContext } from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';

import Chart from './Chart';
import { resultsContext } from 'Dashboard/ResultsContext';
import { round, mbyte } from 'shared/utils/math';
import Card from 'shared/components/Card';

const Charts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    grid-gap: 1rem;
`;

const roundedMbit = flow([(v) => v * 8, mbyte, round]);

const TestHistory = () => {
    const { results } = useContext(resultsContext);

    return (
        <Charts>
            <Card title="Bandwidth">
                <Chart
                    group="speedtest"
                    id="speed-graph"
                    series={[
                        {
                            name: 'download (mbps)',
                            data: results.map((result) => {
                                return [
                                    Date.parse(result.timestamp),
                                    roundedMbit(result.download.bandwidth),
                                ];
                            }),
                        },
                        {
                            name: 'upload (mbps)',
                            data: results.map((result) => {
                                return [
                                    Date.parse(result.timestamp),
                                    roundedMbit(result.upload.bandwidth),
                                ];
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
                            data: results.map((result) => {
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
