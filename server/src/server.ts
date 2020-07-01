import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { bgGreen } from "chalk";
import dotenv from "dotenv";
dotenv.config();

import { speedtestService, router as speedtestRouter } from "./Speedtest";
import { router as eventsRouter } from "./Event";
import { scheduleService, Interval } from "./Schedule";

const errorMiddleware = (
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
        stack: process.env.NODE_ENV === "production" ? "📦" : error.stack,
    });
};

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

    app.use(errorMiddleware);

    scheduleService.set(Interval.Every12h, async () => {
        const result = await speedtestService.run();
        await speedtestService.save(result);
    });

    app.listen(API_PORT, () => {
        console.log(
            bgGreen(`Server listening on http://localhost:${API_PORT}/`)
        );
    });
})();
