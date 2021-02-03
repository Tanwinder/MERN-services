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
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

auth(app);

mongoose.connect(keys.mongoURI);

app.get("/", (req, res) => {
    res.status(200);
    res.send({hi: "world"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server starts at PORT:-", PORT)
})

