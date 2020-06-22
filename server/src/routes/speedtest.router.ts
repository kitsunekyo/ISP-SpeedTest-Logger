import { Router } from "express";

import SpeedtestController from "../controllers/speedtest.controller";
import ScheduleController from "../controllers/schedule.controller";

const router = Router();

router.get("/", async (req, res) => {
    const data = await SpeedtestController.list();
    res.json(data);
});

router.post("/", async (req, res) => {
    const data = await SpeedtestController.run();
    if (data) {
        await SpeedtestController.save(data);
    }
    res.json(data);
});

router.post("/schedule", async (req, res) => {
    const { schedule } = req.body;
    const allowedValues = ["24h", "12h", "6h"];

    if (!schedule || !allowedValues.includes(schedule)) {
        return res.json({ error: "invalid body { schedule: '24h' | '12h' | '6h' }" });
    }

    try {
        await ScheduleController.create(schedule, () => {
            SpeedtestController.run();
        });
        return res.sendStatus(200);
    } catch (e) {
        return res.json({ error: e });
    }
});

router.get("/schedule", (req, res) => {
    res.json(ScheduleController);
});

export default router;
