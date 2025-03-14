import Media from '../models/Media.js';

export const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const {downloadEnabled, viewOnceEnabled,uploadedBy, fileName } = req.body;

        // Create a new Media document using the Cloudinary URL from req.file.path
        const media = new Media({
            fileUrl: req.file.path,
            downloadEnabled: downloadEnabled === 'true',
            viewOnceEnabled: viewOnceEnabled ==='true',
            fileName: fileName || req.file.originalname,
            uploadedBy: uploadedBy, // or req.user._id if you're using auth middleware
        });

        await media.save();

        res.status(200).json({
            success: true,
            message: 'Media uploaded and saved successfully',
            media,
        });
    } catch (error) {
        console.error('Media upload error:', error);
        res.status(500).json({ success: false, message: 'Media upload failed', error: error.message });
    }
};

export const getMediaByUser = async (req, res) => {
    try {
        const userId = req.query.userId; // Read user ID from the query parameter
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User id is required' });
        }

        // Find media documents uploaded by the provided user ID.
        // You can also sort them by creation date if needed.
        const media = await Media.find({ uploadedBy: userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, media });
    } catch (error) {
        console.error('Error fetching media by user:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

export const markMediaAsViewed = async (req, res) => {
    try {
        const { mediaId } = req.params;
        const { viewed } = req.body;
        const media = await Media.findByIdAndUpdate(
            mediaId,
            { viewed },
            { new: true }
        );
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.status(200).json({ message: 'Media marked as viewed', media });
    } catch (error) {
        console.error('Error updating media:', error);
        res.status(500).json({ message: 'Server error' });
    }
};