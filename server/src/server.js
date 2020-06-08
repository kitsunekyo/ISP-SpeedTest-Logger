const express = require("express");

const { API_PORT } = require("../config");
const resultsApi = require("./speedtest/api");
const speedtest = require("./speedtest");

const server = express();

server.get("/speedtest", (req, res) => {
    const list = resultsApi.list();
    res.json(list);
});

server.post("/speedtest", async (req, res) => {
    const result = await speedtest.run();
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

server.listen(API_PORT, () => {
    console.log(`server listening on port ${API_PORT}`);
});
