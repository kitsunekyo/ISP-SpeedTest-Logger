const mongoose = require("mongoose");

const Speedtest = require("./speedtest/Speedtest.model");

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL);
};