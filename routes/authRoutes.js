const passport = require("passport");

module.exports = (app, appUrl) => {
    app.get("/auth/google", passport.authenticate("google", { 
        scope:[ 'profile', 'email' ] 
    }))
    
    app.get("/auth/google/callback", 
        passport.authenticate("google", { failureRedirect: appUrl }),
        (req, res) => {
            console.log("req /auth/google/callback -----------", req.user);
            console.log("appUrl /auth/google/callback -----------", appUrl);
            console.log("res /auth/google/callback -----------", res);
            // res.send("successfully logged in")
            res.redirect(appUrl)
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect(appUrl)
    })

    app.get("/api/currentuser", (req, res) => {
        console.log("req.user /api/currentuser------", req.user);
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