const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/auth")
const {getArticle, getByGenre, getByID, getBySearch, post, deleteArticle, updateByID} = require("../Controllers/BlogController")
const cookieParser = require("cookie-parser");
router.use(cookieParser());

// GetAllArticle
router.get("/getArticle", getArticle);

// Post article
router.post("/post",auth, post);

// Get article by its genre
router.get("/get/:genre", getByGenre);

// Display by id
router.get("/get/id/:_id", getByID);

// Search for article
router.get("/search/:query", getBySearch);

// Delete Article
router.post("/deleteArticle", auth, deleteArticle);

router.post("/update/:_id",auth, updateByID);

module.exports = router;
