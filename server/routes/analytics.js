import express from "express";
import { getAnalyticsData } from "../controllers/analytics.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAnalyticsData);

export default router; 