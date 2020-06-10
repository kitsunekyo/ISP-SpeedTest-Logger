const express = require("express");

const speedtestDb = require("./db");
const speedtestService = require("./service");
const speedtestRouter = express.Router();

speedtestRouter.get("/", async (req, res) => {
    const list = await speedtestDb.list();
    res.json(list);
});

speedtestRouter.post("/", async (req, res) => {
    const result = await speedtestService.run();
    res.send(result);
});

speedtestRouter.get("/:id", (req, res) => {
    const result = speedtestDb.find({
        result: {
            id: req.params.id,
        },
    });

    res.json(result);
});

module.exports = speedtestRouter;
