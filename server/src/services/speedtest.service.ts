import { default as speedtestUtil } from "speedtest-net";

import { Speedtest } from "../models/Speedtest";
import SpeedtestDb from "../db/speedtest.db";

const SpeedtestService = (() => {
    const _speedtestOptions = {
        acceptLicense: true,
        acceptGdpr: true,
    };
    
    const run = (): Promise<Speedtest> => {
        return speedtestUtil(_speedtestOptions);
    };

    const save = async (speedtest: Speedtest): Promise<Speedtest> => {
        try {
            await SpeedtestDb.save(speedtest);
        } catch (e) {
            // error saving data
            return e;
        }

        return speedtest;
    };

    const list = async (): Promise<Speedtest[]> => {
        let speedtests: Speedtest[];
        try {
            speedtests = await SpeedtestDb.list();
            return speedtests;
        } catch (e) {
            // error loading data
            return e;
        }
    };

    return {
        run,
        save,
        list,
    };
})();

export default SpeedtestService;
