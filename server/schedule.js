const schedule = require("node-schedule");

const speedtest = require("./src/speedtest");
const { JOBTIMING } = require("./config");

const job = schedule.scheduleJob(JOBTIMING, () => {
    console.log("Running Speedtest");
    speedtest.run();
});
