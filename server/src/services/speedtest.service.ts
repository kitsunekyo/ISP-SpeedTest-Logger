import speedtestNet from "speedtest-net";

import { SpeedtestResult } from "../models/SpeedtestResult";
import resultsDb from "../db/results";
import socket from "../socket";

const handleProgressEvent = (event: unknown) => {
  socket.io().emit("speedtest-progress-event", event);
};

const OPTIONS = {
  acceptLicense: true,
  acceptGdpr: true,
  progress: handleProgressEvent,
};

let isRunning = false;

const run = async (): Promise<SpeedtestResult> => {
  if (isRunning) {
    throw new Error("Speedtest is already running");
  }
  isRunning = true;
  try {
    const result = await speedtestNet(OPTIONS);
    isRunning = false;
    return result;
  } catch (e) {
    isRunning = false;
    throw e;
  }
};

const save = async (speedtest: SpeedtestResult): Promise<SpeedtestResult> => {
  return await resultsDb.save(speedtest);
};

const list = async (): Promise<SpeedtestResult[]> => {
  return await resultsDb.list();
};

export default {
  run,
  save,
  list,
};
