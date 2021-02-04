const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/key");
const auth = require("./routes/authRoutes");

require("./models/users")
require("./services/passport");

const app = express();

app.use(
    cookieSession({
        name: "userCookie",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
)

app.use(passport.initialize());
app.use(passport.session());

auth(app);

mongoose.connect(keys.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
.then( acc => {
    console.log("mongoDB connected----", acc)
})
.catch( err => {
    console.log("issue with connecting MongoDB----", err)
})

app.get("/", (req, res) => {
    res.status(200);
    res.send({hi: "world"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server starts at PORT:-", PORT)
})

