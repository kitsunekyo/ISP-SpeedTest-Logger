import db from './db';
import { SpeedtestResult } from "./../models/SpeedtestResult";

const results = db.get("results");

const save = async (speedtest: SpeedtestResult): Promise<SpeedtestResult> => {
    await results.insert(speedtest);
    return speedtest;
};

const list = async (): Promise<SpeedtestResult[]> => {
    return await results.find();
};

export default {
    save,
    list,
};