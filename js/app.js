/**
 * Augment Array Prototype with min and max functions
 */

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

/**
 * Vue App
 */

var app = new Vue({
    el: '#app',
    data: {
        log: {
            data: [],
            avg: {
                download: 0,
                upload: 0,
                ping: 0
            },
            max: {
                download: 0,
                upload: 0,
                ping: 0
            },
            min: {
                download: 0,
                upload: 0,
                ping: 0
            }
        },
        config: {}
    },
    methods: {
        buildLabels: function(json) {
            var __self = this;
            $.each(json.log, function() {
                __self.log.data.push({
                    "timestamp": moment(this.timestamp).add(1, 'hours').format('DD MMM - HH:mm'), // adding 1 hour to get VIE time
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
            for (var i = 0; i < this.log.data.length; i++) {
                sum.download += this.log.data[i].download << 0;
            }
            for (var i = 0; i < this.log.data.length; i++) {
                sum.upload += this.log.data[i].upload << 0;
            }
            for (var i = 0; i < this.log.data.length; i++) {
                sum.ping += this.log.data[i].ping << 0;
            }
            this.log.avg.download = (sum.download / this.log.data.length).toFixed(2);
            this.log.avg.upload = (sum.upload / this.log.data.length).toFixed(2);
            this.log.avg.ping = (sum.ping / this.log.data.length).toFixed(2);
        },
        calcMinMax: function() {
            var __downloads = [];
            var __uploads = [];
            var __pings = [];

            this.log.data.forEach(function(obj, index){
                __downloads.push(obj.download);
                __uploads.push(obj.upload);
                __pings.push(obj.ping);
            });

            this.log.max.download = __downloads.max();
            this.log.min.download = __downloads.min();

            this.log.max.upload = __uploads.max();
            this.log.min.upload = __uploads.min();

            this.log.max.ping = __pings.max();
            this.log.min.ping = __pings.min();


        },
        chartZoom: function (target) {
            target.chart.zoomToIndexes(this.log.data.length - 40, this.log.data.length - 1);
        },
        chartSetPanSelect: function(e) {
            var target;

            switch (e.target.getAttribute('name')) {
                case 'groupSpeed':
                    target = speedChart;
                    break;
                case 'groupPing':
                    target = pingChart;
                    break;
                default:
                    console.log("Don't know which chart to configure!");
                    break;
            }
            var chartCursor = target.chartCursor;

            if(e.target.checked) {
                console.log('check');
                chartCursor.pan = true;
            }
            else {
                console.log('uncheck');
                chartCursor.pan = false;
                chartCursor.zoomable = true;
            }
            target.validateNow();
        },

        initCharts: function() {
            speedChart = AmCharts.makeChart("speedChart", {
                type: "serial",
                dataProvider: this.log.data,
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
                dataProvider: this.log.data,
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
        },
        loadConfig: function() {
            var __self = this;
            var promise = new Promise(function(resolve, reject) {
                fetch('config.json')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(json) {
                        __self.config = json;
                        resolve();
                    }, function(){
                        reject();
                    });
            });
            return promise;
        },
        loadData: function() {
            var __self = this;
            var promise = new Promise(function(resolve, reject) {
                fetch(__self.config.app.jsonUrl)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(json) {
                        __self.buildLabels(json);
                        __self.initCharts();
                        __self.calcAvg();
                        __self.calcMinMax();
                        resolve();
                    }, function(){
                        reject();
                    });
            });
            return promise;
        }
    },
    created: function() {
        var __self = this;
        this.loadConfig().then(function(){
            __self.loadData();
            moment.locale(__self.config.app.locale);
        });
    }
});