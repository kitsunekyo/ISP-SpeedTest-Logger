import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { speedtestService, router as speedtestRouter } from "./Speedtest";
import { router as eventsRouter } from "./Event";
import { scheduleService, Interval } from "./Schedule";
import socket from "./socket";
import { router as authRouter } from "./Auth";
import { errorLogMiddleware, httpLogMiddleware } from "./logger";

const errorMiddleware = (error: any, req: Request, res: Response, next: any) => {
    process.env.NODE_ENV !== "production" && console.log(error.message);

    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }

    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "📦" : error.stack,
    });
};

const notFoundHandler = (req: Request, res: Response) => {
    res.status(404);
    res.json({
        message: "requested resource not found",
    });
};

(async () => {
    const app = express();

    if (process.env.CORS) {
        app.use(
            cors({
                origin: process.env.CORS,
            })
        );
    }

    app.use(helmet());
    app.use(bodyParser.json({ strict: false }));

    app.use(httpLogMiddleware);
    app.use("/speedtest", speedtestRouter);
    app.use("/events", eventsRouter);
    app.use("/oauth2", authRouter);
    app.use(notFoundHandler);

    app.use(errorLogMiddleware);
    app.use(errorMiddleware);

    const server = http.createServer(app);
    const io = socket.setup(server);

    io.on("connection", (s) => {
        console.log("connected");
        s.on("disconnect", () => {
            console.log("disconnected");
        });
    });

    scheduleService.set(Interval.Every12h, async () => {
        const result = await speedtestService.run();
        await speedtestService.save(result);
    });

    server.listen(process.env.API_PORT, () => {
        console.log(`[server] listening on http://localhost:${process.env.API_PORT}/`);
    });
})();
