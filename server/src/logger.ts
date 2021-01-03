import winston from "winston";
import expressWinston from "express-winston";

export const httpLogMiddleware = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
});

export const errorLogMiddleware = expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
});