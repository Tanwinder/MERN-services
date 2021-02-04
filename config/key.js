if(process.env.NODE_ENV === 'production') {
    //for production environment
    module.exports = require("./prod");
} else {
    //for local development
    module.exports = require("./dev");
}
