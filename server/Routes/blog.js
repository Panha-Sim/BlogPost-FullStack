const express = require("express");
const router = express.Router();
const blogModel = require("../models/article");
const userModel = require("../models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

router.use(cookieParser());
require("dotenv").config({ path: ".env" });

router.get("/getArticle", (req, res) => {
  blogModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/post", async (req, res) => {
  try {
    //authenticate
    const { token } = req.cookies;
  
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, user) => {
        if (err) throw err;
      });
    } else {
      
      return res.status(401).send("no token");
    }
    
    //change _id to name
    const { author } = req.body;
    const { username } = await userModel.findById(author);

    const { title, genre, body } = req.body;
    const payload = {
      title,
      genre,


      author: username,
      body,
    };
  
    const newblog = new blogModel(payload);
    newblog.save();

    return res.status(200).json(newblog);
  } catch (err) {
    return res.status(500).send("internal error");
  }
});

router.get("/get/:genre", async (req, res) => {
  const { genre } = req.params;
  const blog = await blogModel.find({ genre });
  res.status(200).json(blog);
});

// Display by id
router.get("/get/id/:_id", async (req, res) => {
  const { _id } = req.params;
  const blog = await blogModel.findById(_id);
  res.json(blog);
});

router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  const queryWords = query.split(" ");
  const regex = new RegExp(queryWords.join("|"), "i");
  const blogs = await blogModel.find({ title: { $regex: regex } });
  res.json(blogs);
});

module.exports = router;
