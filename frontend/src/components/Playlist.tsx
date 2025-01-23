interface PlaylistProps {
    name: string;
    createdAt: string;
    onClick: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({ name, createdAt, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="block min-w-[300px] max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
            <p className="font-normal text-gray-700">Date: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default Playlist;
