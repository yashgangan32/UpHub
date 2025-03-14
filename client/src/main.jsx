
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/authenticationPages/SignUp';
import SignInPage from './pages/authenticationPages/SignIn';
import Home from './pages/Home';
import UserMedia from './pages/UserMedia';
import RequireAuth from './middleware/RequireAuth';
import AlreadySigned from './middleware/AlreadySigned';
import UploadedMediaPage from './pages/UploadedMediaPage';
import VideoCallPage from './pages/VideoCallPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AlreadySigned/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user-media/:userId" element={<UserMedia />} />
          <Route path="/user-media-uploaded/:userId" element={<UploadedMediaPage />} />
          <Route path="/video-call/:roomName" element={<VideoCallPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
