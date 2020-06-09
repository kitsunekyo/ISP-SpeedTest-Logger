const speedtestUtil = require("speedtest-net");
const db = require("./db");

const speedtestOptions = {
    acceptLicense: true,
    acceptGdpr: true,
};
/**
 * module to run speedtest and persist in lowdb
 */
const speedtestService = (function () {
    async function run() {
        try {
            const result = await speedtestUtil(speedtestOptions);
            db.create(result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return {
        run,
    };
})();

module.exports = speedtestService;
