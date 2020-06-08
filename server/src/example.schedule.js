const speedtest = require("./speedtest");

(async () => {
    console.log("Running Speedtest");
    await speedtest.run();
    console.log("Speedtest completed");
})();
