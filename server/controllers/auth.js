import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {

            if(profile.id !== process.env.ALLOWED_GOOGLE_ID) {
                return done(null, false, { message: 'This Google account is not authorised' });
            }

            return done(null, profile);
        })
);

const users = new Map();

passport.serializeUser((user, done) => {
    users.set(user.id, user); // store user in memory
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, users.get(id));
});

export default passport;
export const google_authenticate = passport.authenticate('google', {
    scope: ['profile'],
});

export const google_callback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err)  return next(err);

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json("success");
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
    const redirectUrl = new URL(process.env.FRONTEND_BASE_URL);

        req.logout(err => {
            if (err) return next(err);
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                redirectUrl.searchParams.set('reason', 'loggedout');
                res.redirect(redirectUrl.toString());
            });
        });

}