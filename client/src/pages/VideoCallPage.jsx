import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JitsiMeet from '../components/JitsiMeet';

const VideoCallPage = () => {
    const { roomName } = useParams();
    const navigate = useNavigate();

    const handleEndCall = async () => {
        try {
            // Delete the video call invitation by roomName (as before)
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/video-calls/room/${roomName}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error ending call:', error);
        } finally {
            
            navigate('/home');
        }
    };

    // Called when the Jitsi meeting signals it's ready to close
    const handleClose = async () => {
        await handleEndCall();
    };

    return (
        <div className="relative h-screen">
            {/* Jitsi Meet External API */}
            <JitsiMeet
                roomName={roomName}
                displayName="Current User"  // or fetch from cookies, e.g. user.name
                onClose={handleClose}
            />
            <button
                onClick={handleEndCall}
                className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                End Call
            </button>
        </div>
    );
};

export default VideoCallPage;
