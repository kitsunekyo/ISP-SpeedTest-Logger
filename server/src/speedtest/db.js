const Speedtest = require("./Speedtest.model");

/**
 * module to read and write to lowdb collection for test results
 */
const speedtestDb = (() => {
    async function create(result) {
        const speedtest = await Speedtest.create(result,);
        return speedtest;
    }

    async function list() {
        const speedtests = await Speedtest.find({});
        return speedtests;
    }

    async function find(query) {
        const speedtest = await Speedtest.find(query);
        return speedtest;
    }

    return {
        list,
        find,
        create,
    };
})();

module.exports = speedtestDb;
