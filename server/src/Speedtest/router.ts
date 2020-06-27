import { Router, Response, Request } from "express";

import { speedtest } from "./controller";
import { schedule } from "../Schedule";
import { SuccessResponse, ErrorResponse } from "../models/Response";

const router = Router();

router.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        const data = await speedtest.list(req.query);
        return res.json(new SuccessResponse(data));
    }
);

router.post(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await speedtest.run();
            await speedtest.save(data);
            return res.json(new SuccessResponse(data));
        } catch (e) {
            return res.sendStatus(500).json(new ErrorResponse(e.message));
        }
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
            return res.sendStatus(500).json(new ErrorResponse(e.message));
        }
    }
);

router.get(
    "/schedule",
    (req: Request, res: Response): Response => {
        const cron = schedule.getInterval();
        return res.json(new SuccessResponse(cron));
    }
);

export default router;
