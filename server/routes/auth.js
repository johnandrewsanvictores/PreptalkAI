import express from "express";

import {
    google_authenticate,
    google_callback,
    getUser,
    logout,
    createUser,
    validateUserInfo, signIn
} from "../controllers/auth.js";

const router = express.Router();

router.get('/google', google_authenticate);
router.get('/google/callback', google_callback);
router.get('/me', getUser);
router.get('/logout', logout);
router.post('/signup', validateUserInfo, createUser);
router.post('/signin', signIn);
export default router;