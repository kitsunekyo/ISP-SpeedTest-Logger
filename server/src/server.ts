import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { bgGreen, red } from "chalk";
import dotenv from "dotenv";
dotenv.config();

import Db from "./db";
import ScheduleService from "./services/schedule.service";
import speedtestRouter from "./routes/speedtest.router";
import SpeedtestService from "./services/speedtest.service";
import { ScheduleInterval } from "./models/ScheduleInterval";

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
    app.use(morgan("combined"));
    app.use(bodyParser.json({ strict: false }));
    app.use("/speedtest", speedtestRouter);

    ScheduleService.update(ScheduleInterval["12h"], () => {
        SpeedtestService.run();
    }).catch((e) => {
        console.error(red(e));
    });

    await Db.connect();

    app.listen(API_PORT, () => {
        console.log(
            bgGreen(`Server listening on http://localhost:${API_PORT}/`)
        );
    });
})();
