const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("welcome");
});

app.post("/login", (req, res) => {
    // res.status(200).send("post login endpoint");
    
    /** set cookie starts type 1 **/
    res
    .writeHead(200, {
      "Set-Cookie": "token=encryptedstring; HttpOnly",
      "Access-Control-Allow-Credentials": "true"
    })
    .send();
    /** set cookie starts type 1 **/
    
    /** set cookie starts type 2 **/
		/*
        res.cookie(
			'token', 'someTokenValue', 
			{
				httpOnly: true, 
				maxAge: DAY * 21, 
				sameSite: "None", 
				secure: true 
			}
		);
        */
    /** set cookie ends type 2 **/
});

app.get("/private", (req, res) => {
    //   res.status(200).send("get private endpoint");
	
	/** get cookie starts **/
    if (!req.cookies.token) return res.status(401).send();
	/** get cookie ends **/
	
    res.status(200).json({ secret: "Ginger ale is a specific Root Beer", token: req.cookies.token });
});

app.listen(3000, () => {
    console.log("listening on port 3000...");
});
