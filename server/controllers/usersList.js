import User from '../models/User.js';

export const getAllUsersExceptLoggedIn = async (req, res) => {
    try {
        const loggedInUserId = req.query.userId;
        if (!loggedInUserId) {
            return res.status(400).json({ message: 'User id not provided.' });
        }

        // Fetch all users except the logged-in user and exclude the password field
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};