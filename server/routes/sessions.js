import express from "express";
import { getSessionDetails, createSession } from "../controllers/session.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", auth, getSessionDetails);
router.post("/", auth, createSession);

export default router; 