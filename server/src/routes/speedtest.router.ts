import { Router, Response, Request } from "express";

import SpeedtestService from "../services/speedtest.service";
import ScheduleService from "../services/schedule.service";

const router = Router();

router.get(
    "/",
    async (req, res): Promise<Response> => {
        const data = await SpeedtestService.list();
        return res.json(data);
    }
);

router.post(
    "/",
    async (req, res): Promise<Response> => {
        const data = await SpeedtestService.run();
        if (data) {
            await SpeedtestService.save(data);
        }
        return res.json(data);
    }
);

router.post(
    "/schedule",
    async (req: Request, res): Promise<Response> => {
        if (req.body === 0) {
            ScheduleService.destroy();
            return res.sendStatus(200);
        }

        try {
            await ScheduleService.update(req.body, () => {
                SpeedtestService.run();
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
        const cron = ScheduleService.getInterval();
        return res.json(cron);
    }
);

export default router;
