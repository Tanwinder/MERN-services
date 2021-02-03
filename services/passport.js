const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const keys = require("../config/key");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then( user => {
        done(null, user);
    })

})

passport.use(new GoogleStrategy(
    {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        console.log("request, accessToken, refreshToken, profile, done-----", profile, accessToken);
        User.findOne({
            googleId: profile.id
        })
        .then(existingUser => {
            if(existingUser) {
                console.log("user is already there----", existingUser);
                done(null, existingUser);
            } else {
                new User({ 
                    googleId: profile.id,
                    displayName: profile.displayName
                 })
                 .save()
                 .then( user => done(null, user))
                //  .catch( err => {
                //      console.log("error", err);
                //      done(err, null);
                //  })
            }
        }) 
    }
));
