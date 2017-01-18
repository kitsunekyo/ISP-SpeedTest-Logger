moment.locale('de');

var chart;
var log = {
    labels:[],
    download:[],
    upload:[],
    ping:[]
}

fetch('log.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        buildLabels(json);
        initCharts();
    });

function buildLabels(json) {
    $.each(json.log, function () {
        log.labels.push(moment(this.timestamp).format('DD MMM - HH:mm'));
        log.download.push((this.download * 1e-6).toFixed(2));
        log.upload.push((this.upload * 1e-6).toFixed(2));
        log.ping.push(this.ping.toFixed(2));
    });
}
function initCharts() {
    speedChart = new Chart($('#speedsChart'), {
        type: 'line',
        data: {
            labels: log.labels,
            datasets: [
                {
                    label: "Download (Mbps)",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(15, 185, 13, 0.4)",
                    borderColor: "rgba(15, 185, 13, 1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(15, 185, 13, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(15, 185, 13, 1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: log.download,
                    spanGaps: false,
                },
                {
                    label: "Upload (Mbps)",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: log.upload,
                    spanGaps: false,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    pingChart = new Chart($('#pingChart'), {
        type: 'line',
        data: {
            labels: log.labels,
            datasets: [
                {
                    label: "Ping (ms)",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(15, 185, 13, 0.4)",
                    borderColor: "rgba(15, 185, 13, 1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(15, 185, 13, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(15, 185, 13, 1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: log.ping,
                    spanGaps: false,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}