import cron from "node-cron";
import { Interval } from "./Interval";

let _task: cron.ScheduledTask;
let _interval: Interval;

const getCronExpression = (
    minutes: number | string = "*",
    hours: number | string = "*",
    days: number | string = "*",
    months: number | string = "*",
    weekday: number | string = "*"
): string => {
    return `${minutes} ${hours} ${days} ${months} ${weekday}`;
};

const getInterval = (): Interval => _interval;

const destroy = (): void => {
    if (_task) _task.destroy();
};

const set = async (
    interval: Interval,
    fn: () => void
): Promise<cron.ScheduledTask> => {
    destroy();

    if (interval === Interval.Off) {
        _interval = interval;
        return _task;
    }

    let hourCronString;
    switch (interval) {
        case Interval.Every6h:
            hourCronString = "*/6";
            break;
        case Interval.Every12h:
            hourCronString = "*/12";
            break;
        case Interval.Every24h:
        default:
            hourCronString = "*/24";
            break;
    }

    const cronExpression = getCronExpression(0, hourCronString);

    if (!cron.validate(cronExpression)) {
        throw new Error(`invalid cron expression ${cronExpression}`);
    }

    _task = cron.schedule(cronExpression, fn);
    _interval = interval;
    _task.start();
    return _task;
};

export default { destroy, set, getInterval };