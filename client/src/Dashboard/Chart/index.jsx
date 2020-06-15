import React, { useState } from 'react';
import { default as ApexChart } from 'react-apexcharts';

import { chartOptions } from './chartOptions';

const Chart = ({ id, group, series, width = '100%', height = 200 }) => {
	const [chartData, setChartData] = useState({
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
