import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { updatePlaylist } from "../services";

interface EditPlaylistProps {
    onClose: () => void;
    name: string;
    playlistId: string;
}

const EditPlaylist = ({ onClose, name, playlistId }: EditPlaylistProps) => {
    const [formValues, setFormValues] = useState<{ name: string }>({
        name: name,
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Updating Playlist...");
        setLoading(true);

        const response = await updatePlaylist(playlistId, formValues);

        if (response.success) {
            toast.success("Playlist updated successfully!");
            onClose();
        } else {
            toast.error(response.message || "Something went wrong!");
        }

        setLoading(false);
        toast.dismiss(toastId);
    };

    return (
        <div className="w-full sm:w-[400px] max-w-[500px] bg-white rounded-lg p-6">
            <h3 className="mb-6 text-center text-xl text-gray-800 font-semibold">Edit Playlist</h3>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Playlist Name
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter playlist name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        type="submit"
                        disabled={loading}
                    >
                        Update Playlist
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPlaylist;
