import express from 'express';
import { registerUser,loginUser } from '../controllers/authentication.js';

const router = express.Router();

// Use the handler
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
