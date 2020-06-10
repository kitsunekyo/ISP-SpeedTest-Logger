import { Router } from "express";
import SpeedtestService from "./../services/speedtest.service";

const router = Router();

router.get("/", async (req, res) => {
    const data = await SpeedtestService.list();
    res.json(data);
});
router.post("/", async (req, res) => {
    const data = await SpeedtestService.run();
    if (data) {
        await SpeedtestService.save(data);
    }
    res.json(data);
});

export default router;
