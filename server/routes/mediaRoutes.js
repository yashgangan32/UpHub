// routes/mediaRoutes.js
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { uploadMedia, getMediaByUser, markMediaAsViewed } from '../controllers/mediaController.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'siddhi 18+', // Cloudinary folder name
        resource_type: 'auto'
    },
});

const upload = multer({ storage });
const router = express.Router();

// Endpoint to upload media
router.post('/upload', upload.single('file'), uploadMedia);

// Endpoint to fetch media by user (pass user id as query parameter)
router.get('/mediaByUser', getMediaByUser);
router.patch('/:mediaId/viewed', markMediaAsViewed);

export default router;
