import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createPlaylist = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError(400, `Name is required.`));
    }

    try {
        const newPlaylist = await Playlist.create({
            name,
            userId: req.user.id,
        });

        return res
            .status(201)
            .json(
                new ApiResponse(201, { playlist: newPlaylist }, "Playlist created successfully")
            )
    } catch (error) {
        next(error);
    }
};

const getAllPlaylists = async (req, res, next) => {
    try {
        const playlists = await Playlist.find({ userId: req.user.id });

        return res.status(200).json(
            new ApiResponse(200, { playlists }, "Playlists fetched successfully")
        );
    } catch (error) {
        next(error);
    }
};

const getPlaylistById = async (req, res, next) => {
    const playlistId = req.params.id;

    try {
        const playlist = await Playlist.findOne({ _id: playlistId, userId: req.user.id });

        if (!playlist) {
            return next(new ApiError(404, "Playlist not found"));
        }

        return res.status(200).json(
            new ApiResponse(200, { playlist }, "Playlist fetched successfully")
        );
    } catch (error) {
        return next(error);
    }
};

const updatePlaylist = async (req, res, next) => {
    const { name, songs } = req.body;
    const playlistId = req.params.id;

    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { name, songs },
            { new: true }
        );
        return res.status(200).json(
            new ApiResponse(200, { playlist: updatedPlaylist }, "Playlists updated successfully")
        );
    } catch (error) {
        return next(error);
    }
};

const deletePlaylist = async (req, res, next) => {
    const playlistId = req.params.id;

    try {
        await Playlist.findByIdAndDelete(playlistId);
        return res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
        });
    } catch (error) {
        return next(error);
    }
};

const addSongToPlaylist = async (req, res, next) => {
    const { song } = req.body;
    const playlistId = req.params.id;

    try {
        const playlist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $push: { songs: song } },
            { new: true }
        );

        if (!playlist) {
            return next(new ApiError(404, "Playlist not found"));
        }

        return res.status(200).json({
            success: true,
            data: playlist,
            message: "Song added to playlist successfully",
        });
    } catch (error) {
        return next(error);
    }
};

export {
    createPlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
};
