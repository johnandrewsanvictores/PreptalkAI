import express from "express";
import { getHistoryData } from "../controllers/history.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getHistoryData);

export default router; 