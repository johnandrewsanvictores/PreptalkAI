import express from "express";

import {google_authenticate, google_callback, getUser, logout} from "../controllers/auth.js";

const router = express.Router();

router.get('/google', google_authenticate);
router.get('/google/callback', google_callback);
router.get('/me', getUser);
router.get('/logout', logout);

export default router;