import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from "../models/userModel.js";
dotenv.config();

passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {

            try{
                let user = await User.findOne({googleId: profile.id});

                if(!user) {
                    user = await User.create({
                        firstName: profile._json.given_name,
                        lastName: profile._json.family_name,
                        password: null,
                        email: profile._json.email, // Make sure 'email' scope is enabled!
                        googleId: profile.id,
                    })
                }

                return done(null, user);
            }catch (error){
                return done(error, null);
            }

        })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
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
});

export const google_callback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err)  return next(err);

        req.logIn(user, (err) => {
            if (err) return next(err);

            res.redirect(process.env.FRONTEND_BASE_URL);
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
    req.logout(err => {
        if (err) return next(err);

        req.session.destroy(() => {
            res.clearCookie('connect.sid');

            res.redirect(process.env.FRONTEND_BASE_URL);

        });
    });
};