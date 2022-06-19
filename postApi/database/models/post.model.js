const mongoose   = require('mongoose');
const validator  = require("validator");
const bcryptjs   = require("bcryptjs")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true,
    }
})
 

const Post      = mongoose.model("post",postSchema)    
module.exports = Post;