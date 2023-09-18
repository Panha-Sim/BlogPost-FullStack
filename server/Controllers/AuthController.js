const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: ".env" });

async function register(req, res) {
    const username = req.body.username;
    const password = req.body.password;
  
    if (await userModel.findOne({ username })) {
      return res.status(409).send("username already exist");
    }
  
    const hashPass = await bcrypt.hash(password, 10);
    const user = new userModel({
      username,
      password: hashPass,
    });
    user.save();
  
    res.status(200).send("register sucessful");
}

async function login(req, res){
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
}

async function logout(req, res){
    res.cookie("token", "", { httpOnly: false, secure: false }).json("ok");
}

async function getProfile(req, res){
    const user = req.user 
    res.status(200).json(user)
}

module.exports = {register, login, logout, getProfile}