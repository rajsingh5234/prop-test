import mongoose from "mongoose"
import { DB_NAME } from "../constants/index.js";
import { MONGODB_URI } from "./serverConfig.js";

const connectDB = async () => {

    try {
        const mongodb_url = `${MONGODB_URI}/${DB_NAME}`
        const connectionInstance = await mongoose.connect(mongodb_url)
        console.log("MONGO_DB Connected Successfully, Host = ", connectionInstance.connection.host);

    } catch (error) {
        console.log("MONGO_DB Connection Failed", error);
        process.exit(1);
    }
}

export default connectDB;