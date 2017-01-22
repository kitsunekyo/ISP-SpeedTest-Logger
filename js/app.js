moment.locale('de');

var chart;
var log = {
    data: [],
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
                log.data.push({
                    "timestamp": moment(this.timestamp).add(1, 'hours').format('DD MMM - HH:mm'),
                    "download": (this.download * 1e-6).toFixed(2),
                    "upload": (this.upload * 1e-6).toFixed(2),
                    "ping": (this.ping.toFixed(2))
                });
            });
        },
        calcAvg: function() {
            var sum = {
                download: 0,
                upload: 0,
                ping: 0
            }
            for (var i = 0; i < log.data.length; i++) {
                sum.download += log.data[i].download << 0;
            }
            for (var i = 0; i < log.data.length; i++) {
                sum.upload += log.data[i].upload << 0;
            }
            for (var i = 0; i < log.data.length; i++) {
                sum.ping += log.data[i].ping << 0;
            }
            log.avg.download = (sum.download / log.data.length).toFixed(2);
            log.avg.upload = (sum.upload / log.data.length).toFixed(2);
            log.avg.ping = (sum.ping / log.data.length).toFixed(2);
        },
        chartZoom: function (target) {
            target.chart.zoomToIndexes(log.data.length - 40, log.data.length - 1);
        },
        chartSetPanSelect: function(target) {
            console.log(target);
            var chartCursor = speedChart.chartCursor;

            if (document.getElementById("rb1").checked) {
                chartCursor.pan = false;
                chartCursor.zoomable = true;

            } else {
                chartCursor.pan = true;
            }
            target.chart.validateNow();
        },

        initCharts: function() {
            speedChart = AmCharts.makeChart("speedChart", {
                type: "serial",
                dataProvider: log.data,
                categoryField: "timestamp",
                categoryAxis: {
                    gridAlpha: 0.15,
                    minorGridEnabled: true,
                    axisColor: "#DADADA",
                    labelRotation: 45
                },
                valueAxes: [{
                    title: "Mbps",
                    axisAlpha: 0.2,
                    id: "v1"
                }],
                "guides": [
                    {
                    "fillAlpha": 0.10,
                    "fillColor": "#d92525",
                    "value": 0,
                    "toValue": 25
                    }
                ],
                graphs: [{
                    title: "Download",
                    id: "g1",
                    valueAxis: "v1",
                    valueField: "download",
                    bullet: "round",
                    bulletBorderColor: "#FFFFFF",
                    bulletBorderAlpha: 1,
                    lineThickness: 2,
                    lineColor: "#88a61b",
                    negativeLineColor: "#0352b5",
                    balloonText: "[[category]]<br><b><span style='font-size:14px;'>Download: [[value]]Mbps</span></b>"
                },
                {
                    title: "Upload",
                    id: "h2",
                    valueAxis: "v1",
                    valueField: "upload",
                    bullet: "round",
                    bulletBorderColor: "#FFFFFF",
                    bulletBorderAlpha: 1,
                    lineThickness: 2,
                    lineColor: "#0e3d59",
                    negativeLineColor: "#0352b5",
                    balloonText: "[[category]]<br><b><span style='font-size:14px;'>Upload: [[value]]Mbps</span></b>"
                }],
                chartCursor: {
                    fullWidth:true,
                    cursorAlpha:0.1,
                    oneBalloonOnly: true
                },
                chartScrollbar: {
                    scrollbarHeight: 30,
                    color: "#FFFFFF",
                    autoGridCount: false,
                    graph: "g1"
                },
                legend: {
                    useGraphSettings: true
                },

                mouseWheelZoomEnabled:true
            });

            pingChart = AmCharts.makeChart("pingChart", {
                type: "serial",
                fontFamily: "Roboto",
                dataProvider: log.data,
                categoryField: "timestamp",
                categoryAxis: {
                    gridAlpha: 0.15,
                    minorGridEnabled: true,
                    axisColor: "#DADADA",
                    labelRotation: 45
                },
                valueAxes: [{
                    title: "ms",
                    axisAlpha: 0.2,
                    id: "v1"
                }],
                "guides": [
                    {
                    "fillAlpha": 0.10,
                    "fillColor": "#d92525",
                    "value": 100,
                    "toValue": 1000
                    }
                ],
                graphs: [{
                    title: "Ping",
                    id: "g1",
                    valueAxis: "v1",
                    valueField: "ping",
                    bullet: "round",
                    bulletBorderColor: "#FFFFFF",
                    bulletBorderAlpha: 1,
                    lineThickness: 2,
                    lineColor: "#d92525",
                    negativeLineColor: "#0352b5",
                    balloonText: "[[category]]<br><b><span style='font-size:14px;'>Ping: [[value]]ms</span></b>"
                }],
                chartCursor: {
                    fullWidth:true,
                    cursorAlpha:0.1,
                    oneBalloonOnly: true
                },
                chartScrollbar: {
                    scrollbarHeight: 30,
                    color: "#FFFFFF",
                    autoGridCount: false,
                    graph: "g1"
                },
                legend: {
                    useGraphSettings: true
                },
                mouseWheelZoomEnabled:true
            });

            speedChart.addListener("dataUpdated", this.chartZoom);
            pingChart.addListener("dataUpdated", this.chartZoom);
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