import cron from "node-cron";
import { ScheduleInterval } from "./../models/ScheduleInterval";

const ScheduleService = (() => {
    let _task: cron.ScheduledTask;
    let _interval: ScheduleInterval;

    const getInterval = (): ScheduleInterval => _interval;

    const getCronExpression = (
        minutes: number | string = "*",
        hours: number | string = "*",
        days: number | string = "*",
        months: number | string = "*",
        weekday: number | string = "*"
    ): string => {
        return `${minutes} ${hours} ${days} ${months} ${weekday}`;
    };

    const destroy = () => {
        if (_task) _task.destroy();
    };

    const update = (
        interval: ScheduleInterval,
        fn: () => void
    ): Promise<cron.ScheduledTask> => {
        return new Promise((resolve, reject) => {
            destroy();

            if (interval === ScheduleInterval.Off) {
                resolve();
            }

            const cronExpression = getCronExpression(
                0,
                `*/${ScheduleInterval[interval].slice(0, -1)}`
            );

            if (!cron.validate(cronExpression)) {
                reject(`invalid cron expression ${cronExpression}`);
            }

            _task = cron.schedule(cronExpression, fn);
            _interval = interval;
            _task.start();
            resolve(_task);
        });
    };

    return {
        update,
        destroy,
        getInterval,
    };
})();

export default ScheduleService;
