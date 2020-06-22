import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { bgGreen, red } from "chalk";
import dotenv from "dotenv";
dotenv.config();

import Db from "./db";
import ScheduleController from "./controllers/schedule.controller";
import speedtestRouter from "./routes/speedtest.router";
import SpeedtestController from "./controllers/speedtest.controller";

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
    app.use(bodyParser.json());
    app.use("/speedtest", speedtestRouter);

    ScheduleController.create("12h", () => {
        SpeedtestController.run();
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
