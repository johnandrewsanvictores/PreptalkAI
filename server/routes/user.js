import express from "express";
import { createResume, getResume } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Protected endpoints – user must be authenticated and can only act on their own resume
router.post('/createResume', auth, createResume);
router.get('/resume', auth, getResume);

export default router;