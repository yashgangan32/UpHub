import express from 'express';
import { createVideoCall, getVideoCallsForUser, deleteVideoCallByRoom } from '../controllers/videoCallController.js';

const router = express.Router();

router.post('/', createVideoCall);
router.get('/', getVideoCallsForUser);
// Delete invitation using roomName (assuming roomName is unique)
router.delete('/room/:roomName', deleteVideoCallByRoom);

export default router;
