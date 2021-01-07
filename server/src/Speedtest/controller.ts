import express from "express";
import * as yup from "yup";

import service from "./service";
import scheduleService from "./../Schedule/service";

/**
 * returns a list of all speedtest results
 */
const list = async (req: express.Request, res: express.Response, next: any): Promise<express.Response> => {
    try {
        const results = await service.list();
        return res.json(results);
    } catch (error) {
        return next(error);
    }
};

/**
 * runs speedtest and saves to db
 */
const run = async (req: express.Request, res: express.Response, next: any): Promise<express.Response> => {
    const DUMMY = {
        _id: "5ff0c417459e1d197898a833",
        timestamp: "2021-01-02T19:05:59.000Z",
        ping: { jitter: 8.907, latency: 23.889 },
        download: { bandwidth: 3975122, bytes: 58329784, elapsed: 15015 },
        upload: { bandwidth: 1223245, bytes: 15846912, elapsed: 11705 },
        packetLoss: 0,
        isp: "Hutchison Drei Austria GmbH",
        interface: {
            internalIp: "172.18.137.159",
            name: "eth0",
            macAddr: "00:15:5D:2F:13:18",
            isVpn: false,
            externalIp: "91.141.1.205",
        },
        server: {
            id: 2034,
            name: "Telemach Rotovz d.d.",
            location: "Maribor",
            country: "Slovenia",
            host: "speedtest.triera.net",
            port: 8080,
            ip: "82.149.22.107",
        },
        result: {
            id: "094e7b78-a774-475c-8973-892d40c30359",
            url: "https://www.speedtest.net/result/c/094e7b78-a774-475c-8973-892d40c30359",
        },
    };
    return res.json(DUMMY);
    try {
        const result = await service.run();
        if (result) {
            await service.save(result);
            return res.json(result);
        } else {
            throw new Error("Error running speedtest");
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * returns the currently configured automatic test interval
 */
const getSchedule = (req: express.Request, res: express.Response): express.Response => {
    const interval = scheduleService.getInterval();
    return res.json(interval);
};

/**
 * set automatic test interval to run speedtest
 */
const setSchedule = async (req: express.Request, res: express.Response, next: any): Promise<express.Response> => {
    try {
        const schema = yup.number().required();
        await schema.validate(req.body);
    } catch (e) {
        next(e);
    }

    await scheduleService.set(req.body, async () => {
        const res = await service.run();
        await service.save(res);
    });
    return res.sendStatus(200);
};

export default {
    list,
    run,
    getSchedule,
    setSchedule,
};
