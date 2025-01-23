import { PORT } from "./config/serverConfig.js";
import app from "./main.js";
import connectDB from "./config/connectDB.js";

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listning on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("MONGO_DB Connection Failed", error);
    });