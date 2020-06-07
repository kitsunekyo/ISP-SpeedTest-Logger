const testResults = require("./src/speedtestApi");
const speedtest = require("./src/speedtest");

(async () => {
    console.log("Running Speedtest");
    const result = await speedtest.run();
    testResults.create(result);
})();
