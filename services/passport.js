const passport = require("passport");
const keys = require("../config/keys.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User.js");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientId,
            clientSecret: keys.google.secretId,
            callbackURL: "/auth/google/callback",
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id})
                .then(user => {
                    if (user) {
                        done(null, user)
                    } else {
                        new User({
                            googleId: profile.id,
                            displayName: profile.displayName
                        }).save().then(user => {
                            done(null, user);
                        });
                    }
                });
        }
    )
);