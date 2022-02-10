import express, { Router } from "express";
import * as yup from "yup";

import speedtestService from "./../services/speedtest.service";
import scheduleService from "./../services/schedule.service";

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
 *              type: number
 */
router.get(
  "/schedule",
  (req: express.Request, res: express.Response): express.Response => {
    const interval = scheduleService.getInterval();
    return res.json(interval);
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
 *            type: number
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
      const schema = yup.number().required();
      await schema.validate(req.body.value);
      await scheduleService.set(req.body, async () => {
        const res = await speedtestService.run();
        await speedtestService.save(res);
      });

      return res.sendStatus(200);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
);

export default router;
