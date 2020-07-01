import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { bgGreen, red } from "chalk";
import dotenv from "dotenv";
dotenv.config();

import Db from "./db";
import { speedtest, router as speedtestRouter } from "./Speedtest";
import { default as eventsRouter } from "./Events";
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
    app.use(helmet());
    app.use(bodyParser.json({ strict: false }));
    app.use("/speedtest", speedtestRouter);
    app.use("/events", eventsRouter);

    app.use(
        (
            error: any,
            req: express.Request,
            res: express.Response,
            next: any
        ) => {
            if (error.status) {
                res.sendStatus(error.status);
            } else {
                res.sendStatus(500);
            }
            res.json({
                message: error.message,
                stack:
                    process.env.NODE_ENV === "production" ? "📦" : error.stack,
            });
        }
    );

    schedule
        .set(Interval.Every12h, () => {
            speedtest.run();
        })
        .catch((error: any) => {
            console.error(red(error));
        });

    await Db.connect();

    app.listen(API_PORT, () => {
        console.log(
            bgGreen(`Server listening on http://localhost:${API_PORT}/`)
        );
    });
})();
