const express = require("express");

const { SERVERPORT } = require("../config");
const resultsApi = require("./speedtest/api");
const speedtest = require("./speedtest");

const server = express();

server.get("/speedtest", (req, res) => {
    const list = resultsApi.list();
    res.json(list);
});

server.post("/speedtest", async (req, res) => {
    await speedtest.run();
    res.send(result);
});

server.get("/speedtest/:id", (req, res) => {
    const result = resultsApi.find({
        result: {
            id: req.params.id,
        },
    });

    res.json(result);
});

server.listen(SERVERPORT, () => {
    console.log(`server listening on port ${SERVERPORT}`);
});
