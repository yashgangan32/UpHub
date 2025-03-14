import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UploadedMediaPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/media/mediaByUser?userId=${userId}`,
                    { method: 'GET', headers: { 'Content-Type': 'application/json' } }
                );
                const data = await response.json();
                console.log('Fetched media:', data);
                if (response.ok) {
                    setMediaItems(data.media);
                } else {
                    console.error('Failed to fetch media:', data.message);
                }
            } catch (error) {
                console.error('Error fetching media:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, [userId]);

    const handleMediaClick = (media) => {
        setSelectedMedia(media);
    };

    const handleCloseModal = () => {
        setSelectedMedia(null);
    };

    return (
        <div className="p-6">
            {/* Go Back Button */}
            <button
                onClick={() => navigate('/home')}
                className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            >
                Go Back
            </button>

            <h1 className="text-3xl font-bold mb-4">Your Uploaded Media</h1>
            {loading ? (
                <p>Loading...</p>
            ) : mediaItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
                        {mediaItems.map((media) => {
                            const isVideo = media.fileUrl.match(/\.(mp4|mov)$/i);
                            return (
                                <div
                                    key={media._id}
                                    className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform hover:scale-105 transition duration-300"
                                    onClick={() => handleMediaClick(media)}
                                >
                                    {isVideo ? (
                                        <>
                                            <video
                                                src={media.fileUrl}
                                                className="w-full aspect-square object-cover rounded"
                                                preload="metadata"
                                                muted
                                            />
                                            <p className="text-center mt-2">video</p>
                                        </>
                                    ) : (
                                        <img
                                            src={media.fileUrl}
                                            alt={media.fileName}
                                            className="w-full aspect-square object-cover rounded"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
            ) : (
                <p>This User Has Not Uploaded Anything Yet.</p>
            )}

            {/* Modal Popup for Media */}
            {selectedMedia && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-75"
                        onClick={handleCloseModal}
                    ></div>
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-3xl mx-4">
                        {selectedMedia.fileUrl.match(/\.(mp4|mov)$/i) ? (
                            <video
                                src={selectedMedia.fileUrl}
                                controls
                                className="w-full h-auto object-contain rounded"
                            />
                        ) : (
                            <img
                                src={selectedMedia.fileUrl}
                                alt={selectedMedia.fileName}
                                className="w-full h-auto object-contain rounded"
                            />
                        )}
                        <p className="mt-4 text-gray-800 text-center">{selectedMedia.fileName}</p>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                Back to Uploaded Media
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadedMediaPage;
