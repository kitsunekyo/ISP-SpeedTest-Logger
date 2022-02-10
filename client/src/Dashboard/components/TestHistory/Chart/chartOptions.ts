export const chartOptions: ApexCharts.ApexOptions = {
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
        show: false,
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
