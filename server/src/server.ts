import express, { Request, Response } from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

import speedtestRouter from "./routes/speedtest.routes";
import scheduleService from "./services/schedule.service";
import socket from "./socket";
import { requireAuth, default as authRouter } from "./routes/auth.routes";
import { errorLogMiddleware, httpLogMiddleware, logger } from "./logger";
import { swaggerSpecification, swaggerUiOptions } from "./swagger/swagger";
import { errorMiddleware } from "./middleware/error";
import userService, { ADMIN_USER } from "./services/user.service";

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

  userService.seedAdminUser();

  app.use(helmet());
  app.use(express.json({ strict: false }));
  app.use(httpLogMiddleware);

  app.use("/speedtest", requireAuth(), speedtestRouter);
  app.use("/auth", authRouter);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecification, swaggerUiOptions)
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

  const user = await userService.findByEmail(ADMIN_USER.email);
  if (user) {
    scheduleService.setFromUserSettings(user);
  }

  server.listen(process.env.API_PORT, () => {
    console.log(
      `[server] listening on http://localhost:${process.env.API_PORT}/`
    );
  });
})();
