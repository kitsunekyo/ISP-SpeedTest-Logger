const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const { API_PORT } = require("../config");
const speedtestRouter = require("./speedtest/router");
const Speedtest = require("./speedtest/Speedtest.model");

const connectDb = () => {
    return mongoose.connect("mongodb://localhost:27017/isp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

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

connectDb().then(async () => {
    app.listen(API_PORT, () => {
        console.log(`Server listening on http://localhost:${API_PORT}/`);
    });
});
