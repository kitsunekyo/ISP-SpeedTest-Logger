import monk from "monk";
import dotenv from "dotenv";
import { Result } from "./Result";
dotenv.config();

const db = monk(process.env.MONGODB_CONNECTION_STRING || "");

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
