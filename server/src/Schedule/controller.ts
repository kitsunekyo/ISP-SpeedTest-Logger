import cron from "node-cron";

import { Interval } from "./Interval";

export const schedule = (() => {
    let _task: cron.ScheduledTask;
    let _interval: Interval;

    const getInterval = (): Interval => _interval;

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

    const set = (
        interval: Interval,
        fn: () => void
    ): Promise<cron.ScheduledTask> => {
        return new Promise((resolve, reject) => {
            destroy();

            if (interval === Interval.Off) {
                resolve();
            }

            const cronExpression = getCronExpression(
                0,
                `*/${Interval[interval].slice(0, -1)}`
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
        set,
        destroy,
        getInterval,
    };
})();
