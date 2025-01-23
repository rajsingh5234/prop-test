import mongoose, { Schema } from "mongoose";

const PlaylistSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [{ type: Object }],
}, { timestamps: true })

export const Playlist = mongoose.model('Playlist', PlaylistSchema);