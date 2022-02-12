import express, { Router } from "express";
import * as yup from "yup";

import speedtestService from "../services/speedtest.service";
import scheduleService from "../services/schedule.service";
import userService from "../services/user.service";
import { Interval } from "../models/Interval";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: speedtest
 *  description: API to manage speedtest results
 * components:
 *  schemas:
 *    SpeedtestResult:
 *      type: object
 */

/**
 * @swagger
 * /speedtest/:
 *  get:
 *    description: Get all speedtest results
 *    tags: [speedtest]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SpeedtestResult'
 */
router.get(
  "/",
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const results = await speedtestService.list();
    return res.json(results);
  }
);

/**
 * @swagger
 * /speedtest/:
 *  post:
 *    description: start a new speedtest
 *    tags: [speedtest]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SpeedtestResult'
 */
router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const result = await speedtestService.run();
    if (result) {
      await speedtestService.save(result);
      return res.json(result);
    } else {
      throw new Error("Error running speedtest");
    }
  }
);

/**
 * @swagger
 * /speedtest/schedule:
 *  get:
 *    description: get the current speedtest schedule
 *    tags: [speedtest]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              value:
 *                type: number
 *                example: 2
 */
router.get(
  "/schedule",
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const email = req.user.email || "";
    const interval = await scheduleService.getInterval(email);
    return res.json({ value: interval });
  }
);

/**
 * @swagger
 * /speedtest/schedule:
 *  post:
 *    description: set the speedtest schedule
 *    tags: [speedtest]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [value]
 *            properties:
 *              value:
 *                type: number
 *                example: 2
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/schedule",
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const newInterval = req.body.value;
      const schema = yup.number().required();
      await schema.validate(newInterval);

      if (!Object.values(Interval)?.includes(newInterval)) {
        return res.sendStatus(400);
      }

      const user = await userService.findByEmail(req.user.email);
      if (!user) {
        return res.sendStatus(400);
      }
      await userService.updateSettings(user, {
        speedtestSchedule: newInterval,
      });
      await scheduleService.setFromUserSettings(user);

      return res.sendStatus(200);
    } catch (e) {
      return res.sendStatus(500);
    }
  }
);

export default router;
