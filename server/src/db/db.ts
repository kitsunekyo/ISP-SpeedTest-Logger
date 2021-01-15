import monk from "monk";

const db = monk(process.env.MONGODB_CONNECTION_STRING || "");

export default db;
