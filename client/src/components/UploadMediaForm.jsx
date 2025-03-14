import React, { useState } from 'react';

const UploadMediaForm = ({ userId, onClose, onSubmit: externalOnSubmit }) => {
    const [file, setFile] = useState(null);
    const [downloadEnabled, setDownloadEnabled] = useState(false);
    const [viewOnceEnabled, setViewOnceEnabled] = useState(false);
    const [fileName, setFileName] = useState('No file chosen');
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        } else {
            setFile(null);
            setFileName('No file chosen');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please choose a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('downloadEnabled', downloadEnabled);
        formData.append('viewOnceEnabled', viewOnceEnabled);
        formData.append('fileName', fileName);
        formData.append('uploadedBy', userId);

        try {
            setIsUploading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/media/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setUploadStatus('Upload successful!');
                // Clear form fields after successful upload:
                setFile(null);
                setFileName('No file chosen');
                setDownloadEnabled(false);
                setViewOnceEnabled(false);
                if (externalOnSubmit) externalOnSubmit(data);
            } else {
                setUploadStatus('Upload failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            setUploadStatus('Upload error: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal Content with horizontal margins for mobile */}
            <div className="bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Upload Media</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Select File:</label>
                        <div className="flex items-start">
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded flex-shrink-0"
                                style={{ minWidth: '120px' }}
                            >
                                Choose File
                            </label>
                            <span className="ml-4 text-gray-600 break-words flex-1">{fileName}</span>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept="image/*,video/*" 
                                capture="user"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="download"
                            checked={downloadEnabled}
                            onChange={(e) => setDownloadEnabled(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="download" className="text-gray-700">
                            Enable Download
                        </label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="viewonce"
                            checked={viewOnceEnabled}
                            onChange={(e) => setViewOnceEnabled(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="viewonce" className="text-gray-700">
                            Enable View Once
                        </label>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                            disabled={isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>
                </form>
                {uploadStatus && <p className="mt-4 text-center text-gray-800">{uploadStatus}</p>}
            </div>
        </div>
    );
};

export default UploadMediaForm;
