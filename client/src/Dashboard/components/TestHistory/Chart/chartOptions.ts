export const chartOptions = {
    stroke: {
        curve: 'smooth',
    },
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        labels: {
            minWidth: '150px',
        },
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
