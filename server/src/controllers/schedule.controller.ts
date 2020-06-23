import cron from "node-cron";

const ScheduleController = (() => {
    let _task: cron.ScheduledTask;
    let _interval: string;

    const getTaskInstance = (): cron.ScheduledTask => _task;
    const getCronExpression = (): string => _interval;

    const transformStringToCronExpression = (
        interval: "24h" | "12h" | "6h"
    ): string => {
        return `0 */${interval.slice(0, -1)} * * *`;
    };

    const create = (
        interval: "24h" | "12h" | "6h",
        fn: () => void
    ): Promise<cron.ScheduledTask> => {
        return new Promise((resolve, reject) => {
            const cronExpression = transformStringToCronExpression(interval);

            if (!cron.validate(cronExpression)) {
                reject(`invalid cron expression ${cronExpression}`);
            }

            if (_task) {
                _task.destroy();
            }

            _task = cron.schedule(cronExpression, fn);
            _interval = interval;
            _task.start();
            resolve(_task);
        });
    };

    return {
        create,
        getTaskInstance,
        getCronExpression,
    };
})();

export default ScheduleController;
