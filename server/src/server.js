const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { API_PORT } = require("../config");
const speedtestRouter = require("./speedtest/router");

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

app.use("/speedtest", speedtestRouter);

app.listen(API_PORT, () => {
    console.log(`Server listening on http://localhost:${API_PORT}/`);
});

