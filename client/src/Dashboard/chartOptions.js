export const chartOptions = {
	stroke: {
		curve: 'smooth',
	},
	xaxis: {
		type: 'datetime',
	},
	legend: {
		show: true,
	},
	grid: {
		show: true,
		yaxis: {
			lines: {
				show: true,
			},
		},
		xaxis: {
			lines: {
				show: true,
			},
		},
	},
	tooltip: {
		x: {
			format: 'dd MMM hh:mm:ss',
		},
	},
};
