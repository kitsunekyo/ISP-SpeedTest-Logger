import { Schema, Document, Model, model, MongooseFilterQuery } from "mongoose";

import { ResultDTO } from "./ResultDTO";

const ResultSchema = new Schema({
    timestamp: Date,
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

export interface ResultDocument extends Document, ResultDTO {}

export const ResultModel = model<ResultDocument, Model<ResultDocument>>(
    "SpeedtestResult",
    ResultSchema
);

export const ResultDb = (() => {
    const save = async (speedtest: ResultDTO): Promise<ResultDTO> => {
        await ResultModel.create(speedtest);
        return speedtest;
    };

    const remove = async (id: string): Promise<void> => {
        await ResultModel.deleteOne({ _id: id });
    };

    const list = async (
        filter: MongooseFilterQuery<
            Pick<ResultDocument, "_id" | "timestamp" | "isp">
        >
    ): Promise<ResultDTO[]> => {
        return await ResultModel.find(filter);
    };

    return {
        save,
        remove,
        list,
    };
})();
