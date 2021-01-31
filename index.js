const express = require("express");
const app = express();


// app.static("public");

app.get("/", (req, res) => {
    res.status(200);
    res.send({hi: "world"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server starts at PORT:-", PORT)
})

