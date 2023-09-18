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

app.use("/auth", authRoute);
app.use("/blog",blogRoute);

app.listen(process.env.PORT, () => {
  console.log("Server Running!!");
});
