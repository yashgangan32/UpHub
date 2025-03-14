import express from 'express';
import authRoutes from './authRoutes.js';
import userListHome from './userListHome.js'
import mediaRoutes from './mediaRoutes.js';
import videoCallRoutes from './videoCallRoutes.js';

const router = express.Router();
// Use all routes
router.use('/auth', authRoutes);
router.use('/list',userListHome);
router.use('/media',mediaRoutes);
router.use('/video-calls',videoCallRoutes);


export default router;
