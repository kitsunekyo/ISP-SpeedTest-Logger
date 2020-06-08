const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { API_PORT } = require("../config");
const db = require("./speedtest/db");
const speedtest = require("./speedtest");

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:8081", "http://localhost:8080"],
    })
);

app.get("/", (req, res) => {
    res.send("API Running on /speedtest");
});

app.get("/speedtest", (req, res) => {
    const list = db.list();
    res.json(list);
});

app.post("/speedtest", async (req, res) => {
    const result = await speedtest.run();
    res.send(result);
});

app.get("/speedtest/:id", (req, res) => {
    const result = db.find({
        result: {
            id: req.params.id,
        },
    });

    res.json(result);
});

app.listen(API_PORT, () => {
    console.log(`Server listening on http://localhost:${API_PORT}/`);
});
