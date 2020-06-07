const speedtestUtil = require("speedtest-net");

/**
 * module to run speedtest and persist in lowdb
 */
const speedtest = (function () {
    async function run() {
        let result = null;
        try {
            result = await speedtestUtil();
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
