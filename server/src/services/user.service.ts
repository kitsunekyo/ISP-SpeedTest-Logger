import crypto from "crypto";

import { CreateUserRequest, User } from "../models/User";
import { Interval } from "../models/Interval";
import { Settings } from "../models/Settings";
import usersDb from "../db/users";

export const ADMIN_USER: CreateUserRequest = {
  email: "admin@test.com",
  password: process.env.ADMIN_PW || "admin",
};

const findById = (id: string) => usersDb.findById(id);
const findByEmail = (email: string) => usersDb.findByEmail(email);
const create = (user: User) => usersDb.create(user);
const updateSettings = async (user: User, settings: Partial<Settings>) => {
  return await usersDb.updateSettings(user, settings);
};

const seedAdminUser = async () => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(ADMIN_USER.password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user: User = {
    email: ADMIN_USER.email,
    salt,
    hash,
    role: "admin",
    settings: {
      speedtestSchedule: Interval.Every12h,
    },
  };
  const adminUser = await findByEmail(ADMIN_USER.email);
  if (!adminUser) {
    await create(user);
  }
};

const checkCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> => {
  const user = await findByEmail(email);

  if (!user) return null;

  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
    .toString("hex");
  if (hash === user.hash) {
    return user;
  }
  return null;
};

export default {
  findById,
  findByEmail,
  create,
  seedAdminUser,
  checkCredentials,
  updateSettings,
};
