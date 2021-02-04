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
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then( user => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
        proxy: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        console.log("profile-----------", profile);
        console.log("accessToken-----", accessToken);
        User.findOne({
            googleId: profile.id
        })
        .then(existingUser => {
            if(existingUser) {
                console.log("user is already existing----", existingUser);
                done(null, existingUser);
            } else {
                new User({ 
                    googleId: profile.id,
                    displayName: profile.displayName
                 })
                 .save()
                 .then( user => done(null, user))
                 .catch( error => {
                     console.log("issue with creating new user into mongoDB error", error);
                     done(err, null);
                 })
            }
        })
        .catch(error => {
            console.log("issue with finding a user in mongoDB-------------", error)
        })
    }
));
