import speedtestNet from "speedtest-net";

import { Result } from "./Result";
import resultDb from "./resultDb";
import socket from "./../socket";

const handleProgressEvent = (event: any) => {
    socket.io().emit("speedtest-progress-event", event);
};

const OPTIONS = {
    acceptLicense: true,
    acceptGdpr: true,
    progress: handleProgressEvent,
};

let isRunning = false;

const run = async (): Promise<Result> => {
    if (isRunning) {
        throw new Error("Speedtest is already running");
    }
    isRunning = true;
    const result = await speedtestNet(OPTIONS);
    isRunning = false;
    return result;
};

const save = async (speedtest: Result): Promise<Result> => {
    return await resultDb.save(speedtest);
};

const list = async (
    start: Date | string | null = null,
    end: Date | string | null = null
): Promise<Result[]> => {
    return await resultDb.list(start, end);
};

export default {
    run,
    save,
    list,
};
