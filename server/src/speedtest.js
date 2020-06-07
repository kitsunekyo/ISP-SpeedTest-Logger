const speedtestUtil = require("speedtest-net");
const testResults = require("./speedtestApi");

/**
 * module to run speedtest and persist in lowdb
 */
const speedtest = (function () {
    async function run() {
        let result = null;
        try {
            result = await speedtestUtil();
            testResults.create(result);
        } catch (err) {
            console.error(err.message);
        }
        return result;
    }

    return {
        run,
    };
})();

module.exports = speedtest;
