const dealWithJson = require("./dealWithJson.controller");
class Post{
    static home = (req, res)=> { 
        const data = dealWithJson.readDataFromJSON("models/posts.json");
        res.render("home", {
            pageTitle: "All Posts",
            data,
            isEmpty: !(data.length) 
        })
    }
    static add = (req, res)=> {
        if(req.query.title) {
            const data = dealWithJson.readDataFromJSON("models/posts.json");
            const post = {...req.query, id:Date.now()};
            data.push(post);
            dealWithJson.writeDataToJSON("models/posts.json", data);
            res.redirect("/");
        }
        else{
            res.render("add", {
                pageTitle: "Add Post"
            })
        } 
    }
    static addPost = (req, res) => {
        res.render("addPost", {
            pageTitle: "Add Post"
        })
    }
    static addPostLogic = (req, res) => {
        const data = dealWithJson.readDataFromJSON("models/posts.json");
        const post = {...req.body, id: Date.now()}
        data.push(post);
        dealWithJson.writeDataToJSON("models/posts.json", data);
        res.redirect("/");
    }
    static single = (req, res)=> { 
        const data   = dealWithJson.readDataFromJSON("models/posts.json");
        const postId = req.params.id;
        const postData = data.find( x => x.id == postId);
        res.render("single", {
            pageTitle: "Show Post",
            postData
        })
    }
    static edit =  (req, res)=> { 
        const data = dealWithJson.readDataFromJSON("models/posts.json");
        const postId = req.params.id;
        const postData = data.find( x => x.id == postId);
        res.render("edit",  {
            pageTitle: "Edit Post", 
            postData
        })
    }
    static editPost =(req, res, newData) => {
        const data = dealWithJson.readDataFromJSON("models/posts.json");
        const postId = req.params.id;
        const index  = data.findIndex(x => x.id == postId);
        data[index]  = {id: postId, ...req.body}
        dealWithJson.writeDataToJSON("models/posts.json", data);
        res.redirect("/");
    }
    static delete = (req, res) => {
        const data = dealWithJson.readDataFromJSON("models/posts.json");
        const postId = req.params.id;
        const postData = data.filter(x => x.id != postId);
        dealWithJson.writeDataToJSON("models/posts.json", postData);
        res.redirect("/");
        res.render("delete", {
            pageTitle: "delete Post",
            postData
        })
    }
}
module.exports = Post
