const speedtestUtil = require("speedtest-net");
const db = require("./db");

/**
 * module to run speedtest and persist in lowdb
 */
const speedtest = (function () {
    async function run() {
        try {
            const result = await speedtestUtil();
            db.create(result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        run,
    };
})();

module.exports = speedtest;
