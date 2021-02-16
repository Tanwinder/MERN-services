const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser')
const passport = require("passport");
const keys = require("./config/key");

require("./models/users")
require("./services/passport");

const app = express();

app.use(bodyParser.json())
app.use(
    cookieSession({
        name: "userCookie",
        maxAge: 30 * 60 * 1000,
        // maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

mongoose.connect(keys.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
.then( acc => {
    console.log("mongoDB successfully connected----")
})
.catch( error => {
    console.log("MongoDB connectivity error----", error)
})

const PORT = process.env.PORT || 5000;
console.log("process.env.NODE_ENV----", process.env.NODE_ENV)

app.listen(PORT, () => {
    console.log("server started at PORT:-", PORT)
})

