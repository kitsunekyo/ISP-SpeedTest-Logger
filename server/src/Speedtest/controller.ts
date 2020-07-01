import express from "express";
import * as yup from "yup";

import service from "./service";
import scheduleService from "./../Schedule/service";
import { SuccessResponse } from "./../models/Response";

/**
 * returns a list of all speedtest results
 */
const list = async (
    req: express.Request,
    res: express.Response,
    next: any
): Promise<express.Response> => {
    const results = await service.list();
    return res.json(new SuccessResponse(results));
};

/**
 * runs speedtest and saves to db
 */
const run = async (
    req: express.Request,
    res: express.Response,
    next: any
): Promise<express.Response> => {
    try {
        const result = await service.run();
        if (result) {
            await service.save(result);
            return res.json(new SuccessResponse(result));
        } else {
            throw new Error('Error running speedtest');
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * returns the currently configured automatic test interval
 */
const getSchedule = (
    req: express.Request,
    res: express.Response
): express.Response => {
    const interval = scheduleService.getInterval();
    return res.json(new SuccessResponse(interval));
};

/**
 * set automatic test interval to run speedtest
 */
const setSchedule = async (
    req: express.Request,
    res: express.Response,
    next: any
): Promise<express.Response> => {
    try {
        const schema = yup.number().required();
        await schema.validate(req.body);
    } catch (e) {
        next(e);
    }

    const result = await scheduleService.set(req.body, async () => {
        const res = await service.run();
        await service.save(res);
    });
    return res.json(new SuccessResponse(result));
};

export default {
    list,
    run,
    getSchedule,
    setSchedule,
};
