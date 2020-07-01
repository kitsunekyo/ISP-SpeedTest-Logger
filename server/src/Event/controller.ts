import express from "express";
import { nanoid } from "nanoid";

import service from "./service";

const connect = (
    req: express.Request,
    res: express.Response,
    next: any
): void => {
    const eventsHeaders = {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
    };
    res.writeHead(200, eventsHeaders);

    const data = `data: connected\n\n`;
    res.write(data);
    res.write("retry: 10000\n\n");

    const id = nanoid();
    service.connect(id, res);

    req.on("close", () => {
        service.disconnect(id);
    });
};

export default {
    connect,
};
