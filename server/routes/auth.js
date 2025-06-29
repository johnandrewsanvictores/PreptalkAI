import express from "express";

import {
    google_authenticate,
    google_callback,
    getUser,
    logout,
    createUser,
    validateUserInfo, signIn
} from "../controllers/auth.js";
import auth from "../middleware/auth.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get('/google', google_authenticate);
router.get('/google/callback', google_callback);
router.get('/me', getUser);
router.get('/logout', logout);
router.post('/signup', validateUserInfo, createUser);
router.post('/signin', signIn);
router.get('/user/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // exclude password

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;