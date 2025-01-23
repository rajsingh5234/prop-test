import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import path from "path";

const __dirname = path.resolve()

const app = express();

app.use(cookieParser())

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.use(errorMiddleware);

export default app;