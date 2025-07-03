import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import emailRoutes from './routes/email.js';
import connectDbB from './config/db.js';
import dashboardRoutes from './routes/dashboard.js';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import {getDocument} from "pdfjs-dist/legacy/build/pdf.mjs";

dotenv.config();
const app = express();

// Connect to DB
connectDbB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [
        process.env.FRONTEND_BASE_URL,
        'https://accounts.google.com'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        domain: process.env.COOKIE_DOMAIN,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use('/auth', authRoutes);
app.use('/mail', emailRoutes);
app.use('/dashboard', dashboardRoutes);
app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        const buffer = await fs.readFile(req.file.path);
        const uint8Array = new Uint8Array(buffer); // ✅ Convert Buffer to Uint8Array

        const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
        const loadingTask = getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;

        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            text += strings.join(' ') + '\n';
        }

        await fs.unlink(req.file.path);
        res.json({ text });
    } catch (err) {
        console.error('🔥 PDF PARSE ERROR:', err);
        res.status(500).json({ error: 'Failed to parse PDF' });
    }
});




// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
