import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import emailRoutes from './routes/email.js';
import connectDbB from './config/db.js';

dotenv.config();
const app = express();

// Connect to DB
connectDbB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true // Allow session cookies from frontend
}));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/mail', emailRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
