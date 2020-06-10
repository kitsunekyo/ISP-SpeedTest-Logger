import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import speedtestRouter from "./routes/speedtest.router";
import Db from "./db";

(async () => {
    const { API_PORT, CORS } = process.env;
    const app = express();

    app.use(bodyParser.json());
    app.use("/speedtest", speedtestRouter);

    if (CORS) {
        app.use(
            cors({
                origin: [CORS.split(",")],
            })
        );
    }

    const db = await Db.connect();

    app.listen(API_PORT, () => {
        console.log(`Server listening on http://localhost:${API_PORT}/`);
    });
})();
