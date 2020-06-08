const speedtestUtil = require("speedtest-net");
const resultsApi = require("./api");

/**
 * module to run speedtest and persist in lowdb
 */
const speedtest = (function () {
    async function run() {
        try {
            const result = await speedtestUtil();
            resultsApi.create(result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        run,
    };
})();

module.exports = speedtest;
