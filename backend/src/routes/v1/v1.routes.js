import { Router } from "express";
import authRouter from "./auth.routes.js";
import playlistRouter from "./playlist.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/playlists", playlistRouter);

export default router;