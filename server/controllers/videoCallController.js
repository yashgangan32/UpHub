import VideoCall from '../models/VideoCall.js';

// Create a video call invitation (caller initiates)
export const createVideoCall = async (req, res) => {
    try {
        const { callerId, callerName, targetUserId, roomName } = req.body;
        if (!callerId || !callerName || !targetUserId || !roomName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const videoCall = new VideoCall({
            callerId,
            callerName,
            targetUserId,
            roomName,
            status: 'pending'
        });
        await videoCall.save();
        res.status(201).json({ message: 'Video call invitation created', videoCall });
    } catch (error) {
        console.error('Error creating video call:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get pending video call invitations for a target user (receiver)
export const getVideoCallsForUser = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: 'User id is required' });
        const calls = await VideoCall.find({ targetUserId: userId, status: 'pending' });
        res.status(200).json({ calls });
    } catch (error) {
        console.error('Error fetching video calls:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a video call invitation by roomName (called when call ends)
export const deleteVideoCallByRoom = async (req, res) => {
    try {
        const { roomName } = req.params;
        const deletedCall = await VideoCall.findOneAndDelete({ roomName });
        if (!deletedCall) {
            return res.status(404).json({ message: 'Call not found' });
        }
        res.status(200).json({ message: 'Call invitation deleted', videoCall: deletedCall });
    } catch (error) {
        console.error('Error deleting video call:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
