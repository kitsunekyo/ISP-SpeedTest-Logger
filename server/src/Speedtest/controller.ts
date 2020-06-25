import speedtestNet from "speedtest-net";

import { ResultDTO } from "./ResultDTO";
import { ResultDb } from "./ResultDb";

export const speedtest = (() => {
    const OPTIONS = {
        acceptLicense: true,
        acceptGdpr: true,
    };

    const run = (): Promise<ResultDTO> => {
        return speedtestNet(OPTIONS);
    };

    const save = async (speedtest: ResultDTO): Promise<ResultDTO> => {
        try {
            await ResultDb.save(speedtest);
        } catch (e) {
            // error saving data
            return e;
        }

        return speedtest;
    };

    const list = async (): Promise<ResultDTO[]> => {
        let speedtests: ResultDTO[];
        try {
            speedtests = await ResultDb.list();
            return speedtests;
        } catch (e) {
            return e;
        }
    };

    return {
        run,
        save,
        list,
    };
})();
