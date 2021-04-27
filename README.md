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

# Google auth creation for prod
1. https://console.cloud.google.com
2. create new project
3. click on create button
4. make sure you are in right project check in top of the left panel
5. left panel select :- OAuth consent screen -> external -> create -> save and continue done
6. Credentials -> create credentials -> Oauth client ID -> web application
7. Add URI -> check your project url on heroku eg:- https://mern-services.herokuapp.com/
8. Authorized redirect URI's eg:- https://mern-services.herokuapp.com/auth/google/callback
9. click on create and copy client iD and your client secret

# mongoDB poject creation
1. login first with google
2. new project
3. build cluster  - steps
   1. free 
   2. AWS 
   3. north virginia
   4. Leave all of the Free Tier options selected and scroll down to the bottom. Click the "Create a Cluster" button // it will take few mins to
5. After the Cluster has been created, you will be taken back to the Clusters page of the database. Click the "Connect" button
6. Click the "Add a Different IP Address button:
7. Enter 0.0.0.0/0 into the IP Address field and click the "Add IP Address" button. This part is extremely important as our Heroku server will not be able to connect to our database unless we whitelist all IP addresses.
In a real production app, you would typically have a static IP and a Fully Qualified Domain Name. In this case, we would whitelist only the static IP. You can read up on this more here:
https://help.heroku.com/JS13Y78I/i-need-to-whitelist-heroku-dynos-what-are-ip-address-ranges-in-use-at-heroku
8. Next, enter a new username and then click the "Autogenerate Secure Password" button. Then click "Create MongoDB User"

# google auth login with google in the code
const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

keys:-    // google acount keys
GOOGLE_CLIENT_ID          
GOOGLE_CLIENT_SECRET

cookieKey  // set cookie key any

// user is login wih google and then will store user info in mongoDB
// paas cookie based on user login to browser and check login based on cookie
// logout just need to detach login cookie in server side


# mongoDB setup in the code
const mongoose = require("mongoose");
keys:-
mongoURI  // mongo url key
routes
models

# Heroku deployment
1. download heroku cli
2. heroku logs --tail --app <app name>  e.g heroku logs --tail --app mern-services





Rought work:-
1. divide into:-
   controllers
   models
   routes








