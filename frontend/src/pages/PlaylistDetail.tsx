import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../components/CustomModal";
import { getPlaylistById } from "../services";
import EditPlaylist from "../components/EditPlaylist";
import TrackSearch from "../components/TrackSearch";

interface PlaylistDetail {
    _id: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    songs: any[];
    createdAt: string;
}

const PlaylistDetail = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
    const [openAddSong, setOpenAddSong] = useState(false);
    const [openEditPlaylist, setOpenEditPlaylist] = useState(false);

    const getPlaylist = async (playlistId: string | undefined) => {
        if (!playlistId) return;
        const toastId = toast.loading("Loading playlist details...");
        const response = await getPlaylistById({ id: playlistId });

        if (response.success) {
            setPlaylist(response.data.data.playlist);
        } else {
            toast.error(response.message || "Something went wrong!");
            navigate("/");
        }
        toast.dismiss(toastId);
    };

    useEffect(() => {
        getPlaylist(playlistId);
    }, [playlistId]);

    const handleAddSong = () => {
        setOpenAddSong(true);
    };

    const handleEditPlaylist = () => {
        setOpenEditPlaylist(true);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-6">
            {playlist ? (
                <>
                    <button
                        onClick={handleGoBack}
                        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Go Back
                    </button>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">{playlist.name}</h2>
                    <p className="text-gray-700 mb-4">
                        Date: {new Date(playlist.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={handleAddSong}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Song
                        </button>
                        <button
                            onClick={handleEditPlaylist}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Edit Playlist
                        </button>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Songs</h3>
                    <div className="flex flex-wrap gap-4">
                        {playlist.songs.length > 0 ? (
                            playlist.songs.map((track) => (
                                <div
                                    key={track.trackId}
                                    className="flex flex-col items-center w-full sm:w-[200px] p-4 border rounded shadow-md hover:shadow-lg transition-shadow bg-white"
                                >
                                    <img
                                        src={track.image}
                                        alt={track.name}
                                        className="w-24 h-24 object-cover rounded mb-4"
                                    />
                                    <p className="font-semibold text-center mb-2">{track.name}</p>
                                    <a
                                        href={track?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        Go to Spotify
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No songs available</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading playlist details...</p>
            )}

            <Modal isOpen={openAddSong} onClose={() => setOpenAddSong(false)}>
                <TrackSearch
                    onClose={async () => {
                        await getPlaylist(playlistId);
                        setOpenAddSong(false);
                    }}
                    playlistId={playlistId!}
                />
            </Modal>

            <Modal isOpen={openEditPlaylist} onClose={() => setOpenEditPlaylist(false)}>
                <EditPlaylist
                    name={playlist?.name || ""}
                    playlistId={playlistId || ""}
                    onClose={async () => {
                        await getPlaylist(playlistId);
                        setOpenEditPlaylist(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default PlaylistDetail;
