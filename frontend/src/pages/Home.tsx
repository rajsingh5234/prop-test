import { useEffect, useState } from "react";
import Playlist from "../components/Playlist";
import Modal from "../components/CustomModal";
import CreatePlaylist from "../components/CreatePlaylist";
import toast from "react-hot-toast";
import { deletePlaylist, getAllPlaylists } from "../services";
import { useNavigate } from "react-router-dom";

interface Playlist {
    _id: string;
    name: string;
    userId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    songs: any[];
    createdAt: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const getPlaylists = async () => {
        const toastId = toast.loading("Loading...");

        const response = await getAllPlaylists();

        if (response.success) {
            setPlaylists(response.data.data.playlists)
        } else {
            toast.error(response.message || "Something went wrong!");
        }

        toast.dismiss(toastId);
    }

    const handleCreatePlaylist = () => {
        setOpen(true)
    };

    const handleDeletePlaylist = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this playlist?");

        if (!confirmed) {
            return;
        }

        const toastId = toast.loading("Loading...");

        const response = await deletePlaylist(id);

        if (!response.success) {
            toast.error(response.message || "Something went wrong!");
        }

        await getPlaylists();
        toast.dismiss(toastId);
    };

    useEffect(() => {
        getPlaylists();
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Your Playlists</h2>

            <button
                onClick={handleCreatePlaylist}
                className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Create New Playlist
            </button>

            <div className="flex flex-wrap gap-6">
                {playlists.map((playlist) => (
                    <div key={playlist._id} className="relative">
                        <Playlist
                            name={playlist.name}
                            createdAt={playlist.createdAt}
                            onClick={() => navigate(`/playlist/${playlist._id}`)}
                        />
                        <button
                            onClick={() => handleDeletePlaylist(playlist._id)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <CreatePlaylist onClose={async () => {
                    await getPlaylists();
                    setOpen(false);
                }} />
            </Modal>
        </div>
    );
};

export default Home;
