const passport = require("passport");

module.exports = (app) => {
    app.get("/auth/google", passport.authenticate("google", { 
        scope:[ 'profile', 'email' ] 
    }))
    
    app.get("/auth/google/callback", passport.authenticate("google"));

    app.get("/api/currentuser", (req, res) => {
        console.log("req-----------------", req.user)
        res.send(req.user);
    })

}