import { MongooseFilterQuery } from "mongoose";
import speedtestNet from "speedtest-net";
import { endOfDay, startOfDay } from "date-fns";

import { ResultDTO } from "./ResultDTO";
import { ResultDb, ResultDocument } from "./ResultDb";

export const speedtest = (() => {
    const OPTIONS = {
        acceptLicense: true,
        acceptGdpr: true,
    };

    const getFilterFromQuery = (
        query: any
    ): MongooseFilterQuery<Pick<ResultDocument, "timestamp">> => {
        const { startDate, endDate } = query;

        // dont like the fact that i know about mongoose here, should be abstracted
        const filter: MongooseFilterQuery<Pick<
            ResultDocument,
            "timestamp"
        >> = {};

        if (startDate || endDate) {
            filter.timestamp = {};
            startDate &&
                (filter.timestamp.$gte = startOfDay(new Date(startDate)));
            endDate && (filter.timestamp.$lte = endOfDay(new Date(endDate)));
        }

        return filter;
    };

    const run = (): Promise<ResultDTO> => {
        return speedtestNet(OPTIONS);
    };

    const save = async (speedtest: ResultDTO): Promise<ResultDTO> => {
        return await ResultDb.save(speedtest);
    };

    const list = async (query: any): Promise<ResultDTO[]> => {
        const filter = getFilterFromQuery(query);
        return await ResultDb.list(filter);
    };

    return {
        run,
        save,
        list,
    };
})();
