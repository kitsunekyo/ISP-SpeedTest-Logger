import speedtestNet from "speedtest-net";

import { Result } from "./Result";
import resultDb from "./resultDb";
import { eventService } from "../Event";

const handleProgressEvent = (event: any) => {
    eventService.broadcast(event);
};

const OPTIONS = {
    acceptLicense: true,
    acceptGdpr: true,
    progress: handleProgressEvent,
};

const run = (): Promise<Result> => {
    return speedtestNet(OPTIONS);
};

const save = async (speedtest: Result): Promise<Result> => {
    return await resultDb.save(speedtest);
};

const list = async (): Promise<Result[]> => {
    return await resultDb.list();
};

export default {
    run,
    save,
    list,
};
