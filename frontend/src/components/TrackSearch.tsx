import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addSongToPlaylist } from "../services";

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
        external_urls: { spotify: string };
    };
}

interface TrackSearchProps {
    onClose: () => void;
    playlistId: string;
}

const TrackSearch: React.FC<TrackSearchProps> = ({ onClose, playlistId }) => {
    const [search, setSearch] = useState("");
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loadingTrackId, setLoadingTrackId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Loader for searchTracks

    const searchTracks = async (search: string) => {
        if (!search.trim()) return;

        setLoading(true);
        try {
            const res = await axios.get(
                `https://v1.nocodeapi.com/raj116/spotify/kngreArZfqIJAyoJ/search?q=${search}&type=track`
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items = (res.data as any)?.tracks?.items || [];
            setTracks(items);
        } catch (error) {
            console.error("Error fetching tracks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSong = async (track: Track) => {
        setLoadingTrackId(track.id);

        const song = {
            trackId: track.id,
            name: track.name,
            image: track.album.images[1].url,
            link: track.album.external_urls.spotify,
        };

        try {
            const response = await addSongToPlaylist(playlistId, { song });

            if (response.success) {
                toast.success(`"${track.name}" added to the playlist!`);
                onClose();
            } else {
                toast.error(response.message || "Failed to add the song.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the song.");
            console.error(error);
        } finally {
            setLoadingTrackId(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            searchTracks(search);
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    return (
        <div className="p-4 max-w-[90vw] min-w-[400px]">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for tracks..."
                className="w-full p-2 border rounded mb-4"
            />
            {loading ? (
                <div className="flex justify-center items-center py-4">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                </div>
            ) : (
                <div className="space-y-4 max-h-[70vh] overflow-auto">
                    {tracks.map((track) => (
                        <div
                            key={track.id}
                            className="flex items-center justify-between p-2 border rounded hover:bg-gray-100"
                        >
                            <div className="flex items-center">
                                <img
                                    src={track.album.images[0]?.url}
                                    alt={track.name}
                                    className="w-12 h-12 rounded mr-4"
                                />
                                <div>
                                    <p className="font-semibold">{track.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {track.artists.map((artist) => artist.name).join(", ")} - {track.album.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddSong(track)}
                                disabled={loadingTrackId === track.id}
                                className={`px-4 py-2 text-sm font-medium text-white rounded text-nowrap ${loadingTrackId === track.id
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                {loadingTrackId === track.id ? "Adding..." : "Add to Playlist"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackSearch;
