import express from "express";
import {createResume, getResume} from "../controllers/user.js";

const router = express.Router();


router.post('/createResume',  createResume);
router.get('/resume',  getResume);

export default router;