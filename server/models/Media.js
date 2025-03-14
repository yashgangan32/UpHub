import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
    {
        fileUrl: { type: String, required: true },
        downloadEnabled: { type: Boolean, default: false },
        viewOnceEnabled: { type: Boolean, default: false },
        viewed : {type:Boolean, default :false},
        fileName: { type: String },
        // Reference to the user who uploaded the media
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);