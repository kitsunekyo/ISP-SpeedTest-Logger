import db from "./db";
import { User } from "../models/User";
import { Settings } from "../models/Settings";

const users = db.get<User>("users");

const findById = async (id: string) => {
  return await users.findOne({ _id: id });
};

const findByEmail = async (email: string) => {
  return await users.findOne({ email });
};

const create = async (user: User): Promise<User> => {
  return await users.insert(user);
};

const updateSettings = async (
  user: User,
  settings: Partial<Settings>
): Promise<User | null> => {
  return await users.findOneAndUpdate(
    { email: user.email },
    { $set: { settings: { ...user.settings, ...settings } } }
  );
};

export default {
  findById,
  findByEmail,
  create,
  updateSettings,
};
