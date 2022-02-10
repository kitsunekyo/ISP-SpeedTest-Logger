import express, { Request, Response } from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

const swaggerUiOptions: SwaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    BearerAuth: {
      name: "Authorization",
      schema: {
        type: "basic",
        in: "header",
      },
      value: "Basic <user:password>",
    },
  },
};

import dotenv from "dotenv";
dotenv.config();

import speedtestService from "./services/speedtest.service";
import speedtestRouter from "./routes/speedtest.routes";

import scheduleService from "./services/schedule.service";
import { Interval } from "./models/Interval";

import socket from "./socket";
import { requireAuth, default as authRouter } from "./routes/auth.routes";
import { errorLogMiddleware, httpLogMiddleware, logger } from "./logger";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: any
) => {
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
  app.use(express.json({ strict: false }));

  app.use(httpLogMiddleware);
  app.use("/speedtest", requireAuth(), speedtestRouter);
  app.use("/auth", authRouter);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerUiOptions)
  );
  app.use(notFoundHandler);

  app.use(errorLogMiddleware);
  app.use(errorMiddleware);

  const server = http.createServer(app);
  const io = socket.setup(server);

  io.on("connection", (s) => {
    logger.log("info", `connected client`);
    s.on("disconnect", () => {
      logger.log("info", `disconnected`);
    });
  });

  scheduleService.set(Interval.Every12h, async () => {
    const result = await speedtestService.run();
    await speedtestService.save(result);
  });

  server.listen(process.env.API_PORT, () => {
    console.log(
      `[server] listening on http://localhost:${process.env.API_PORT}/`
    );
  });
})();
