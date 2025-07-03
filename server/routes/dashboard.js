import express from "express";
import { getDashboardData } from "../controllers/dashboard.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /dashboard – protected route
router.get("/", auth, getDashboardData);

export default router; 