const speedtestUtil = require("speedtest-net");
const speedtestApi = require("./speedtestApi");

/**
 * module to run speedtest and persist in lowdb
 */
const speedtest = (function () {
    async function run() {
        try {
            result = await speedtestUtil();
            speedtestApi.create(result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        run,
    };
})();

module.exports = speedtest;
