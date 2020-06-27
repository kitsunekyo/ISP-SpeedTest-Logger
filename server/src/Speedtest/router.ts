import { Router, Response, Request } from "express";

import { speedtest } from "./controller";
import { schedule } from "../Schedule";

const router = Router();

router.get(
    "/",
        const data = await speedtest.list();
        return res.json(data);
    async (req: Request, res: Response): Promise<Response> => {
    }
);

router.post(
    "/",
        const data = await speedtest.run();
        if (data) {
    async (req: Request, res: Response): Promise<Response> => {
            await speedtest.save(data);
        }
        return res.json(data);
    }
);

router.post(
    "/schedule",
    async (req: Request, res: Response): Promise<Response> => {
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
    (req: Request, res: Response): Response => {
        const cron = schedule.getInterval();
        return res.json(cron);
    }
);

export default router;
