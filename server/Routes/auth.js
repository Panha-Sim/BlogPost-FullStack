const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {register, login, logout, getProfile} = require("../Controllers/AuthController")
const {auth} = require("../middleware/auth");
const { deleteArticle } = require("../Controllers/BlogController");

require("dotenv").config({ path: ".env" });

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));
router.use(cookieParser());
router.use(express.json());

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.post("/logout", logout);

router.post("/deleteArticle",deleteArticle)

// GET PROFILE
router.get("/profile", auth, (req, res) => {
  const { token } = req.cookies;
  
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
      
    });
  } else {
    res.status(401).send("no token");
  }
});

module.exports = router;