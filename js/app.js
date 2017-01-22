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
                log.download.push({
                    "timestamp": moment(this.timestamp).add(1, 'hours').format('DD MMM - HH:mm'),
                    "result": (this.download * 1e-6).toFixed(2)
                });
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
                sum.download += log.download[i].result << 0;
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
            speedChart = AmCharts.makeChart("chartdiv", {
                type: "serial",
                dataProvider: log.download,
                categoryField: "timestamp",
                categoryAxis: {
                    gridAlpha: 0.15,
                    minorGridEnabled: true,
                    axisColor: "#DADADA",
                    labelRotation: 45
                },
                valueAxes: [{
                    axisAlpha: 0.2,
                    id: "v1"
                }],
                graphs: [{
                    title: "red line",
                    id: "g1",
                    valueAxis: "v1",
                    valueField: "result",
                    bullet: "round",
                    bulletBorderColor: "#FFFFFF",
                    bulletBorderAlpha: 0,
                    lineThickness: 2,
                    lineColor: "#b5030d",
                    negativeLineColor: "#0352b5",
                    balloonText: "[[category]]<br><b><span style='font-size:14px;'>value: [[value]]</span></b>"
                }],
                chartCursor: {
                    fullWidth:true,
                    cursorAlpha:0.1
                },
                chartScrollbar: {
                    scrollbarHeight: 30,
                    color: "#FFFFFF",
                    autoGridCount: false,
                    graph: "g1"
                },

                mouseWheelZoomEnabled:true
            });
            speedChart.addListener("dataUpdated", zoomChart);
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

// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    speedChart.zoomToIndexes(log.download.length - 40, log.download.length - 1);
}

// changes cursor mode from pan to select
function setPanSelect() {
    var chartCursor = speedChart.chartCursor;

    if (document.getElementById("rb1").checked) {
        chartCursor.pan = false;
        chartCursor.zoomable = true;

    } else {
        chartCursor.pan = true;
    }
    speedChart.validateNow();
}