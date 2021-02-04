const passport = require("passport");

module.exports = (app) => {
    app.get("/auth/google", passport.authenticate("google", { 
        scope:[ 'profile', 'email' ] 
    }))
    
    app.get("/auth/google/callback", 
        passport.authenticate("google"),
        (req, res) => {
            // res.send("successfully logged in")
            res.redirect("/")
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send("LoggedOut Successfully");
    })

    app.get("/api/currentuser", (req, res) => {
        if(req.user){
            res.send(req.user);
        } else {
            res.send("Please logout first");
        }
        
    })

    app.get("/", (req, res) => {
        res.status(200);
        res.send({hi: "world"})
    })

}