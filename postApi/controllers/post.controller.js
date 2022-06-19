const postModel = require('../database/models/post.model');
class Post {
    static add = async(req, res) => {
        try {
            const post = new postModel(req.body);
            await post.save()
            res.status(200).send({
                apiStatus: true,
                data: post,
                message: "Post added successfully"
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in adding new post"
            })
        }
    }
    static allPosts = async(req, res) => {
        try {
            const allPosts = await postModel.find();
            res.status(200).send({
                apiStatus: true,
                data: allPosts,
                message: "Data fetched" 
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in fetching data"
            })
        }
    }
    static singlePost = async(req, res) => {
        try {
            const postData = await postModel.findById(req.params.id);
            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: "Data fetched" 
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in fetching data"
            }) 
        }
    }
    static updatePost = async(req, res)=> {
        try {
            const postData = await postModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {runValidators:true}
            )
            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: "Data updated" 
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in updating data"
            }) 
        }
    }
    static deletePost = async(req, res) => {
        try {
            const postData = await postModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                apiStatus: true,
                data: postData,
                message: "Data Deleted" 
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                data: error.message,
                message: "Error in updating data"
            }) 
        }
    }
}
module.exports = Post;