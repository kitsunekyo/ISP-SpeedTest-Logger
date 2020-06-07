const testResults = require("./src/speedtestApi");
const speedtest = require("./src/speedtest");

(async () => {
    console.log("Running Speedtest");
    await speedtest.run();
    console.log("Speedtest completed");
})();
