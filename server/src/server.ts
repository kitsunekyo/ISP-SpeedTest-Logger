import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { bgGreen, red } from "chalk";
import dotenv from "dotenv";
dotenv.config();

import Db from "./db";
import { speedtest, router as speedtestRouter } from "./Speedtest";
import { schedule, Interval } from "./Schedule";

(async () => {
    const { API_PORT, CORS } = process.env;
    const app = express();

    if (CORS) {
        app.use(
            cors({
                origin: CORS,
            })
        );
    }
    app.use(morgan("short"));
    app.use(bodyParser.json({ strict: false }));
    app.use("/speedtest", speedtestRouter);

    schedule.set(Interval.Every12h, () => {
        speedtest.run();
    }).catch((error: any) => {
        console.error(red(error));
    });

    await Db.connect();

    app.listen(API_PORT, () => {
        console.log(
            bgGreen(`Server listening on http://localhost:${API_PORT}/`)
        );
    });
})();
