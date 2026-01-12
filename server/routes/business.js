import express from "express";
import { saveBusiness, getBusiness } from "../controllers/business.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, saveBusiness);
router.get("/", auth, getBusiness);

export default router; 