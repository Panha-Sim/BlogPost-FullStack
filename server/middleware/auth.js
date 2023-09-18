const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

 async function auth(req, res, next) {
    const { token } = req.cookies;
    
    if (token) {
      const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      return next();
    } else {
      console.log("dsfd")
      return res.status(401).send("no token");
    }
    
}

module.exports = {auth};