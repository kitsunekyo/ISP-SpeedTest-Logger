moment.locale('de');

var chart;
var log = {
    labels: [],
    download: [],
    upload: [],
    ping: [],
    avg: {
        download: 0,
        upload: 0,
        ping: 0
    }
}

var app = new Vue({
    el: '#app',
    data: {
        log: log
    },
    methods: {
        buildLabels: function(json) {
            $.each(json.log, function() {
                log.labels.push(moment(this.timestamp).add(1, 'hours').format('DD MMM - HH:mm'));
                log.download.push((this.download * 1e-6).toFixed(2));
                log.upload.push((this.upload * 1e-6).toFixed(2));
                log.ping.push(this.ping.toFixed(2));
            });
        },
        calcAvg: function() {
            var sum = {
                download: 0,
                upload: 0,
                ping: 0
            }
            for (var i = 0; i < log.download.length; i++) {
                sum.download += log.download[i] << 0;
            }
            for (var i = 0; i < log.upload.length; i++) {
                sum.upload += log.upload[i] << 0;
            }
            for (var i = 0; i < log.ping.length; i++) {
                sum.ping += log.ping[i] << 0;
            }
            log.avg.download = (sum.download / log.download.length).toFixed(2);
            log.avg.upload = (sum.upload / log.upload.length).toFixed(2);
            log.avg.ping = (sum.ping / log.ping.length).toFixed(2);
        },

        initCharts: function() {
            speedChart = new Chart($('#speedsChart'), {
                type: 'line',
                data: {
                    labels: log.labels,
                    datasets: [{
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
                    datasets: [{
                        label: "Ping (ms)",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(177, 56, 61, 0.4)",
                        borderColor: "#b1383d",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#b1383d",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#b1383d",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: log.ping,
                        spanGaps: false,
                    }]
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
    },
    created: function() {
        var __self = this;
        fetch('//nas.dasblattwerk.at:8080/drei/log.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                __self.buildLabels(json);
                __self.initCharts();
                __self.calcAvg();
            });
    }
});