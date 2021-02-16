const passport = require("passport");

module.exports = (app) => {
    app.get("/auth/google", passport.authenticate("google", { 
        scope:[ 'profile', 'email' ] 
    }))
    
    app.get("/auth/google/callback", 
        passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
        (req, res) => {
            console.log("req /auth/google/callback -----------")
            // res.send("successfully logged in")
            res.redirect("http://localhost:3000")
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("http://localhost:3000")
    })

    app.get("/api/currentuser", (req, res) => {
        if(req.user){
            // setTimeout(() => {
                res.send(req.user);
            // }, 3000)
            
        } else {
            res.send(null);
        }
        
    })

    app.get("/", (req, res) => {
        res.status(200);
        res.send({hi: "world"})
    })

}