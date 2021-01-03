import db from './../db';
import { Result } from "./Result";

const results = db.get("results");

const save = async (speedtest: Result): Promise<Result> => {
    await results.insert(speedtest);
    return speedtest;
};

const list = async (): Promise<Result[]> => {
    return await results.find();
};

export default {
    save,
    list,
};
