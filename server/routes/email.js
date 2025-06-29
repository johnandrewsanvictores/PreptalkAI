import express from "express";

import {
    emailLimiter,
    main_contact,
    project_contact,
    validateMainContact,
    validateProjectContact
} from "../controllers/email.js";

const router = express.Router();

router.post('/main', validateMainContact, emailLimiter,  main_contact);
router.post('/project', validateProjectContact, emailLimiter, project_contact);

export default router;