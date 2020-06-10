import { Schema, Document, Model, model } from "mongoose";

import { Speedtest } from "./../models/Speedtest";

const SpeedtestSchema = new Schema({
    timestamp: String,
    ping: {
        jitter: Number,
        latency: Number,
    },
    download: {
        bandwidth: Number,
        bytes: Number,
        elapsed: Number,
    },
    upload: {
        bandwidth: Number,
        bytes: Number,
        elapsed: Number,
    },
    isp: String,
    interface: {
        internalIp: String,
        name: "",
        macAddr: String,
        isVpn: Boolean,
        externalIp: String,
    },
    server: {
        id: Number,
        name: String,
        location: String,
        country: String,
        host: String,
        port: Number,
        ip: String,
    },
    result: {
        id: String,
        url: String,
    },
});

interface ISpeedtestSchema extends Document, Speedtest {}

export const SpeedtestModel = model<ISpeedtestSchema, Model<ISpeedtestSchema>>(
    "Speedtest",
    SpeedtestSchema
);

const SpeedtestDb = (() => {
    const save = async (speedtest: Speedtest): Promise<Speedtest> => {
        await SpeedtestModel.create(speedtest);
        return speedtest;
    };

    const remove = async (id: string): Promise<void> => {
        await SpeedtestModel.deleteOne({ _id: id });
    };

    const list = async (): Promise<Speedtest[]> => {
        const speedtests = await SpeedtestModel.find({});
        return speedtests || [];
    };

    return {
        save,
        remove,
        list,
    };
})();

export default SpeedtestDb;
