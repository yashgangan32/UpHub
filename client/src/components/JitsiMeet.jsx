import React, { useEffect, useRef } from 'react';

const JitsiMeet = ({ roomName, displayName, onClose }) => {
    const jitsiContainerRef = useRef(null);

    useEffect(() => {
        if (!window.JitsiMeetExternalAPI) {
            console.error('JitsiMeetExternalAPI is not loaded. Please include https://meet.jit.si/external_api.js in your index.html');
            return;
        }

        const domain = 'meet.jit.si';
        const options = {
            roomName,
            parentNode: jitsiContainerRef.current,
            userInfo: {
                displayName,
            },
            configOverwrite: {
                prejoinPageEnabled: false, // Disable prejoin screen
                disableDeepLinking: true,    // Prevent deep linking that might cause redirection on mobile
            },
            interfaceConfigOverwrite: {
                enableWelcomePage: false, // Disable welcome page
            },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        // Optional: Listen to events for debugging or further control
        api.addEventListener('videoConferenceJoined', () => {
            console.log('Joined conference room:', roomName);
        });

        api.addEventListener('readyToClose', () => {
            if (onClose) {
                onClose();
            }
        });

        return () => {
            api.dispose();
        };
    }, [roomName, displayName, onClose]);

    return <div ref={jitsiContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default JitsiMeet;
