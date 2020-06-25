import { Router, Response, Request } from "express";

import { speedtest } from "./controller";
import { schedule } from "../Schedule";

const router = Router();

router.get(
    "/",
    async (req, res): Promise<Response> => {
        const data = await speedtest.list();
        return res.json(data);
    }
);

router.post(
    "/",
    async (req, res): Promise<Response> => {
        const data = await speedtest.run();
        if (data) {
            await speedtest.save(data);
        }
        return res.json(data);
    }
);

router.post(
    "/schedule",
    async (req: Request, res): Promise<Response> => {
        if (req.body === 0) {
            schedule.destroy();
            return res.sendStatus(200);
        }

        try {
            await schedule.set(req.body, () => {
                speedtest.run();
            });
            return res.sendStatus(200);
        } catch (e) {
            return res.json({ error: e });
        }
    }
);

router.get(
    "/schedule",
    (req, res): Response => {
        const cron = schedule.getInterval();
        return res.json(cron);
    }
);

export default router;
