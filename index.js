const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("welcome");
});

app.post("/login", (req, res) => {
    // res.status(200).send("post login endpoint");

    res
    .writeHead(200, {
      "Set-Cookie": "token=encryptedstring; HttpOnly",
      "Access-Control-Allow-Credentials": "true"
    })
    .send();
});

app.get("/private", (req, res) => {
    //   res.status(200).send("get private endpoint");

    if (!req.cookies.token) return res.status(401).send();
    res.status(200).json({ secret: "Ginger ale is a specific Root Beer", token: req.cookies.token });
});

app.listen(3000, () => {
    console.log("listening on port 3000...");
});