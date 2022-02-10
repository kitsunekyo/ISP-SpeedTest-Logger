import { useState } from 'react';
import { default as ApexChart } from 'react-apexcharts';

import { chartOptions } from './chartOptions';

type Props = {
    id: string;
    group?: string;
    series: object[];
    width?: string | number;
    height?: string | number;
};

const Chart = ({ id, group, series, width = '100%', height = 200 }: Props) => {
    const [chartData] = useState({
        options: {
            ...chartOptions,
            chart: {
                animations: {
                    enabled: false,
                },
                id,
                group,
            },
        },
    });

    return (
        <ApexChart
            options={chartData.options}
            series={series}
            type="line"
            width={width}
            height={height}
        />
    );
};

export default Chart;
