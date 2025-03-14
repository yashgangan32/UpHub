import mongoose from 'mongoose';

const videoCallSchema = new mongoose.Schema(
    {
        callerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        callerName: { type: String, required: true },
        targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        roomName: { type: String, required: true },
        status: { type: String, enum: ['pending', 'active'], default: 'pending' }
    },
    { timestamps: true }
);

export default mongoose.model('VideoCall', videoCallSchema);
