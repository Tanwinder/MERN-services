# MERN-services

# config
two config files:-
1. for dev
2. for production in heroku

# server setup
1. git clone "project"
2. npm install
3. npm run dev // for development in local
http:localhost:5000
4. npm run start // for production

# google auth login with google
const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

keys:-    // google acount keys
GOOGLE_CLIENT_ID          
GOOGLE_CLIENT_SECRET

cookieKey  // set cookie key any

// user is login wih google and then will store user info in mongoDB
// paas cookie based on user login to browser and check login based on cookie
// logout just need to detach login cookie in server side


# mongoDB setup
const mongoose = require("mongoose");
keys:-
mongoURI  // mongo url key

routes
models

# Heroku deployment



