const express = require("express");

const { SERVERPORT } = require("./../config");
const speedtestApi = require("./speedtestApi");
const speedtest = require("./speedtest");

const server = express();

server.get("/speedtest", (req, res) => {
    const result = speedtestApi.list();
    res.json(result);
});

server.post("/speedtest", async (req, res) => {
    const result = await speedtest.run();
    speedtestApi.create(result);
    res.send(result);
});

server.get("/speedtest/:id", (req, res) => {
    const result = speedtestApi.find({
        result: {
            id: req.params.id,
        },
    });

    res.json(result);
});

server.listen(SERVERPORT, () => {
    console.log(`server listening on port ${SERVERPORT}`);
});
