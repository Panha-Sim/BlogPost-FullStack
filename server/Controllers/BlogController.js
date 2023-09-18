const blogModel = require("../models/article")
const userModel = require("../models/user")

async function getArticle (req, res) {
    try{
        const result = await blogModel.find({});
        res.status(200).json(result);
    }catch(err){
        res.json(err);
    }

}

async function getByGenre (req, res) {
    try{
    const { genre } = req.params;
    const blog = await blogModel.find({ genre });
    res.status(200).json(blog);
    }catch(err){
        res.json(err);
    }
}

async function getByID (req, res) {
    const { _id } = req.params;
    const blog = await blogModel.findById(_id);
    res.status(200).json(blog);
}

async function getBySearch (req,res) {
    const { query } = req.params;
    const queryWords = query.split(" ");
    const regex = new RegExp(queryWords.join("|"), "i");
    const blogs = await blogModel.find({ title: { $regex: regex } });
    res.status(200).json(blogs);
}
async function post (req, res) {
    try {
        
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
}

async function deleteArticle(req, res){
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
}

async function updateByID(req,res){
    const { _id } = req.params;
    const newBlog = req.body;
  
    try {
      await blogModel.findByIdAndUpdate(_id, newBlog);
    } catch (err) {
      return res.status(400).send("error");
    }
    res.status(200).send("successful");
}

module.exports = {getBySearch, getByID, getByGenre, getArticle, post, deleteArticle, updateByID};
