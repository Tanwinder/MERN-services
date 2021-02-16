// const mongoose = require("mongoose");

// const User = mongoose.model("users")

module.exports = app => {
    app.post("/api/addcredits", async (req, res) => {
        console.log("req.bosy--------", req.body, req.user)
        req.user.credits += req.body.credits;
        try {
            const user = await req.user.save();
            setTimeout(() => {
                res.send(user);
            }, 2000)
        } catch (error) {
            res.status(400)
            res.send(error);
        }
    })
}