import { Router, Response, Request } from "express";
import { nanoid } from "nanoid";

interface Client {
    id: string;
    res: Response;
}

const router = Router();

let clients: Client[] = [];

router.get("/", async (req: Request, res: Response) => {
    const eventsHeaders = {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
    };
    res.writeHead(200, eventsHeaders);

    const data = `data: nothing yet\n\n`;
    res.write(data);
    res.write('retry: 10000\n\n');

    const id = nanoid();
    const newClient: Client = {
        id,
        res,
    };
    clients.push(newClient);

    req.on("close", () => {
        clients = clients.filter((client: Client) => client.id !== id);
    });
});

router.post("/", async (req: Request, res: Response) => {
    broadcast({ mydata: "test" });
    res.sendStatus(200);
});

export const broadcast = (data: any) => {
    const stringifiedData = JSON.stringify(data);
    clients.forEach((client) => {
        client.res.write(`data: ${stringifiedData}\n\n`);
    });
};

export default router;
