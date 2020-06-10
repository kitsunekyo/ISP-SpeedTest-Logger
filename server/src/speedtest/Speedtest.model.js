const mongoose = require("mongoose");

const speedtestSchema = new mongoose.Schema({
    timestamp: String,
    ping: {
        jitter: Number,
        latency: Number,
    },
    download: {
        bandwidth: Number,
        bytes: Number,
        elapsed: Number,
    },
    upload: {
        bandwidth: Number,
        bytes: Number,
        elapsed: Number,
    },
    isp: String,
    interface: {
        internalIp: String,
        name: "",
        macAddr: String,
        isVpn: Boolean,
        externalIp: String,
    },
    server: {
        id: Number,
        name: String,
        location: String,
        country: String,
        host: String,
        port: Number,
        ip: String,
    },
    result: {
        id: String,
        url: String,
    },
});

const Speedtest = mongoose.model("Speedtest", speedtestSchema);

module.exports = Speedtest;