const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const keys = require("../config/key");

const User = mongoose.model("users");


// serializeUser is converting userid into cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
}) 


// deserializeUser is converting back from cookie to User ID
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
        proxy: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        // console.log("profile-----------", profile);
        // console.log("accessToken-----", accessToken);
        const existingUser = await User.findOne({
            googleId: profile.id
        });
        if(existingUser) {
            // console.log("user is already existing----", existingUser);
            done(null, existingUser);
        } else {
            try {
                const newUser = await new User({ 
                    googleId: profile.id,
                    displayName: profile.displayName
                 })
                 .save();
                done(null, newUser);
            } catch (error) {
                console.log("issue with creating new user into mongoDB error", error);
                done(error, null);
            }
        }
    }
));
