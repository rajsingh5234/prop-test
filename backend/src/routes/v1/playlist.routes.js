import { Router } from "express";
import {
    createPlaylist,
    getAllPlaylists,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    getPlaylistById,
} from "../../controllers/playlist.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route("/").post(createPlaylist);
router.route("/").get(getAllPlaylists);
router.get("/:id", getPlaylistById);
router.route("/:id").put(updatePlaylist);
router.route("/:id").delete(deletePlaylist);
router.route("/:id/add-song").post(addSongToPlaylist);

export default router;
