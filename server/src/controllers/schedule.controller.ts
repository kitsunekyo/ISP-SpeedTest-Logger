import cron from "node-cron";

const ScheduleController = (() => {
    let _task: cron.ScheduledTask;

    const transformStringToCronExpression = (
        repeat: "24h" | "12h" | "6h"
    ): string => {
        return `0 */${repeat.slice(0, -1)} * * *`;
    };

    const getTaskInstance = (): cron.ScheduledTask => {
        return _task;
    };

    const create = (
        repeat: "24h" | "12h" | "6h",
        fn: () => void
    ): Promise<cron.ScheduledTask> => {
        return new Promise((resolve, reject) => {
            const cronExpression = transformStringToCronExpression(repeat);

            if (!cron.validate(cronExpression)) {
                reject(`invalid cron expression ${cronExpression}`);
            }

            if (_task) {
                _task.destroy();
            }

            _task = cron.schedule(cronExpression, fn);
            _task.start();
            resolve(_task);
        });
    };

    return {
        create,
        getTaskInstance,
    };
})();

export default ScheduleController;
