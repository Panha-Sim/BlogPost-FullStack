const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogModel = require("./models/article");
const userModel = require("./models/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: ".env" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

// fetch all article
app.get("/getArticle", (req, res) => {
  blogModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//post to the database
app.post("/post", async (req, res) => {
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

//display by genre
app.get("/get/:genre", async (req, res) => {
  const { genre } = req.params;
  const blog = await blogModel.find({ genre });
  res.status(200).json(blog);
});

//display by id
app.get("/get/id/:_id", async (req, res) => {
  //work on this
  const { _id } = req.params;
  const blog = await blogModel.findById(_id);
  res.json(blog);
});

//search bar for Future use
app.get("/get/search/:query", async (req, res) => {
  const { query } = req.params;
  const queryWords = query.split(" ");
  const regex = new RegExp(queryWords.join("|"), "i");
  const blogs = await blogModel.find({ title: { $regex: regex } });
  res.json(blogs);
});

//remove blog working
app.delete("/deleteArticle", async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send("Missing Field");
  }
  const result = await blogModel.deleteOne(req.body);

  if (result.deletedCount === 0) {
    return res.status(404).send("article not found");
  } else {
    return res.send("success");
  }
});

//register
app.post("/register", async (req, res) => {
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

//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  //can't find user
  if (user == null) {
    return res.status(400).send("no user");
  }

  //wrong password
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Wrong credential");
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

app.get("/profile", (req, res) => {
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

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: false, secure: false }).json("ok");
});

app.post("/update/:_id", async (req, res) => {
  const { _id } = req.params;
  const newBlog = req.body;

  try {
    await blogModel.findByIdAndUpdate(_id, newBlog);
  } catch (err) {
    return res.status(400).send("error");
  }
  res.status(200).send("successful");
});

app.listen(process.env.PORT, () => {
  console.log("Server Running!!");
});
