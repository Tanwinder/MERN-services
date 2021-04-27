const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
// const cookieSession = require("cookie-session");
// const passport = require("passport");

const keys = require("./config/key");

// require("./models/users")
// require("./services/passport");

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

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

app.listen(PORT, () => {
    console.log("server started at PORT:-", PORT, "process.env.NODE_ENV---", process.env.NODE_ENV)
})

