const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    password: {
        type:String,
        require: true,
    }
}
);


const userModel = mongoose.model("users",userShema)
module.exports= userModel;