import express from 'express';
import { getAllUsersExceptLoggedIn } from '../controllers/usersList.js';

const router = express.Router();

// Use the handler
router.get('/userlist', getAllUsersExceptLoggedIn);

export default router;
