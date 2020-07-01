import { Router } from "express";

import controller from "./controller";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.run);
router.post("/schedule", controller.setSchedule);
router.get("/schedule", controller.getSchedule);

export default router;
