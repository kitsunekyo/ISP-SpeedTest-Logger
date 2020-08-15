import monk from "monk";
import { Result } from "./Result";
import addDays from "date-fns/addDays";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

const db = monk(process.env.MONGODB_CONNECTION_STRING || "");

const results = db.get("results");

const save = async (speedtest: Result): Promise<Result> => {
    await results.insert(speedtest);
    return speedtest;
};

const list = async (
    start: Date | string | null = null,
    end: Date | string | null = null
): Promise<Result[]> => {
    const startDate = start
        ? new Date(start)
        : new Date(startOfDay(addDays(Date.now(), -14)));
    const endDate = end ? new Date(end) : new Date(endOfDay(Date.now()));

    return await results.find({
        timestamp: {
            $gte: startDate,
            $lte: endDate,
        },
    });
};

export default {
    save,
    list,
};
