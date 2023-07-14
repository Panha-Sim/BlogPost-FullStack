const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/auth");
const blogRoute = require("./Routes/blog")

require("dotenv").config({ path: ".env" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

// AUTH
app.use("/auth", authRoute);
app.use("/blog",blogRoute);

// Remove blog
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

//update
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
