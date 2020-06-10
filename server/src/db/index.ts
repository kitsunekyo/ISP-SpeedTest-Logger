import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || "";

const Db = (() => {
    let instance: typeof mongoose | null = null;

    const connect = async (): Promise<typeof mongoose> => {
        instance = await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return instance;
    };

    const disconnect = async (): Promise<any> => {
        if (instance) {
            await instance.connection.close();
        }
        return instance;
    };

    return { instance, connect, disconnect };
})();

export default Db;
