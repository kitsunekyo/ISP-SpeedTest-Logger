import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || "";

const Db = (() => {
    let instance: typeof mongoose | null = null;

    const connect = async (): Promise<void> => {
        if (CONNECTION_STRING === "") {
            throw new Error(`No Connection String set. Review .env file.`);
        }
        instance = await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    };

    const disconnect = async (): Promise<void> => {
        if (instance) {
            await instance.connection.close();
        }
    };

    return { connect, disconnect };
})();

export default Db;
