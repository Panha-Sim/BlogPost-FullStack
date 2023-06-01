const mongoose = require('mongoose');

const blogShema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    genre:[{type: String}],
    author: {
        type:String,
        require: true,
    },
    body:{
        type: String,
        require: true,
    },
},
{
    timestamps: true,
}
);


const blogModel = mongoose.model("articles",blogShema)
module.exports= blogModel;