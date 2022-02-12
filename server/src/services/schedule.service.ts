import cron from "node-cron";
import { User } from "../models/User";
import { Interval } from "../models/Interval";
import userService from "./user.service";
import speedtestService from "./speedtest.service";

let _task: cron.ScheduledTask;

const getCronExpression = (
  minutes: number | string = "*",
  hours: number | string = "*",
  days: number | string = "*",
  months: number | string = "*",
  weekday: number | string = "*"
): string => {
  return `${minutes} ${hours} ${days} ${months} ${weekday}`;
};

const getInterval = async (email: string): Promise<Interval> => {
  const user = await userService.findByEmail(email);
  if (!user) throw new Error("user not found");
  return user.settings.speedtestSchedule;
};

const stop = (): void => {
  if (_task) _task.stop();
};

const setFromUserSettings = async (user: User): Promise<cron.ScheduledTask> => {
  stop();

  const interval = user.settings.speedtestSchedule;

  if (interval !== Interval.Off) {
    const cronExpression = intervalToCronString(interval);
    _task = cron.schedule(cronExpression, async () => {
      const result = await speedtestService.run();
      await speedtestService.save(result);
    });
    _task.start();
  }

  return _task;
};

const intervalToCronString = (interval: Interval): string => {
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
  return cronExpression;
};

export default { destroy: stop, setFromUserSettings, getInterval };
