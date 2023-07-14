const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config({ path: ".env" });

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));
router.use(cookieParser());
router.use(express.json());

// REGISTER
router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (await userModel.findOne({ username })) {
    return res.statuws(409).send("username already exist");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const user = new userModel({
    username,
    password: hashPass,
  });
  user.save();

  res.status(200).send("register sucessful");
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  //can't find user
  if (user == null) {
    return res.status(400).send("no user");
  }

  //wrong password
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("ss credential");
  } else {
    //jwt sign
    const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, { httpOnly: false, secure: false })
      .status(200)
      .send("Login Successully");
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: false, secure: false }).json("ok");
});

// GET PROFILE
router.get("/profile", (req, res) => {
    
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