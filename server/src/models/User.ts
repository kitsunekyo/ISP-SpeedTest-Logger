import { Interval } from "./Interval";
import { Settings } from "./Settings";

export const defaultSettings: Settings = {
  speedtestSchedule: Interval.Every12h,
};

export interface CreateUserRequest {
  email: string;
  password: string;
}

export interface User {
  _id?: string;
  email: string;
  role: string;
  hash: string;
  salt: string;
  settings: Settings;
}

export interface UserResponse {
  _id: string;
  email: string;
  role: string;
  settings: Settings;
}
