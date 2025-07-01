import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from "../models/userModel.js";
import {hashPassword} from "../utils/hash.js";
import {body, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

function generateUsername(givenName) {
    const name = givenName.toLowerCase().replace(/\s+/g, ''); // lowercase + no spaces
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    return `${name}${randomNum}`;
}


passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {

            try{
                let user = await User.findOne({googleId: profile.id});
                console.log(user)
                console.log(profile);
                console.log(process.env.NODE_ENV);

                if(!user) {
                    user = await User.create({
                        firstName: profile._json.given_name,
                        lastName: profile._json.family_name,
                        password: null,
                        email: profile._json.email, // Make sure 'email' scope is enabled!
                        googleId: profile.id,
                        username: generateUsername(profile._json.given_name)
                    });
                }

                return done(null, user);
            }catch (error){
                return done(error, null);
            }

        })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }catch (error) {
        done(error, null);
    }
});

export default passport;
export const google_authenticate = passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
});

//user
const createToken = (userId) => {
    return jwt.sign({ userId },  process.env.JWT_SECRET, { expiresIn: '7d'});
}

export const google_callback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err)  return next(err);

        req.logIn(user, (err) => {
            if (err) return next(err);

            console.log(req.user)

            const token = createToken(req.user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });


            res.redirect(`${process.env.FRONTEND_BASE_URL}/google-success`);
        });
    })(req, res, next);
}

export const getUser = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);            // whatever you stored in deserializeUser
    }
    res.status(401).json({ message: 'Not authenticated' });
}

export const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        });

        req.session.destroy(err => {
            if (err) return next(err);

            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : false,
            });

            // ✅ Just respond with JSON
            res.status(200).json({ message: 'Logged out successfully' });
        });
    });
};


export const createUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, username} = req.body;

        const hashedPassword = await hashPassword(password);

        const users = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        })

        if (users) {
            if (users.email === email) {
                return res.status(409).json({ error: "Email already exists" });
            }
            if (users.username === username) {
                return res.status(409).json({ error: "Username already exists" });
            }
        }

        const user = await User.create({firstName, lastName,email, password: hashedPassword, username});
        const token = createToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // only on HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            user: {
            userId : user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
            },
            success: "true",
            message: "User created successfully"
        });
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // 3. Create token
        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // only on HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // 4. Send token and user info (without password)
        res.status(200).json({
            user: {
                userId : user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                userType: user.userType,
                isFirstVisit: user.isFirstVisit
            }
        });

    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};


export const updateUser =  async (req, res) => {
    try {
        const { _id, ...updateFields } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true }
        );

        res.status(200).json({ success: true, user: updatedUser, message: "Updated user successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





//VALIDATE USER INFO
export const validateUserInfo = [
    body('firstName').trim().isLength({min:2}).withMessage('Name must be at least 2 characters'),
    body('lastName').trim().isLength({min:2}).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('username').trim().isLength({ min: 6}).withMessage('Username must be at least 6 characters'),
    body('password').trim().isLength({ min: 8}).withMessage('Password must be at least 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                error: errors.array()[0].msg,
            });
        }
        next();
    }
];