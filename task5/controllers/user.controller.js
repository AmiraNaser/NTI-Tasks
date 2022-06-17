const dbConnect = require("../db/connect");
const {ObjectId} = require("mongodb");
class User{
    static home = (req, res)=> { 
        dbConnect(
            db=>
                db.collection("users")
                .find()
                .toArray((error, data)=>{
                    res.render("home", {
                        pageTitle:"all Users",
                        data,
                        isEmpty: !data.length
                    })    
            })
        )
    }
    static addUser = (req, res)=> { 
        res.render("add", {
            pageTitle:"Add User"
        })    
    }
    static addLogic = (req,res)=>{
        const user = req.body
        dbConnect((db)=>{
            db.collection('users').insertOne(user)
            .then(()=>res.redirect("/") )
            .catch(e=> console.log(e))
        })     
    }
    static single = (req, res)=> { 
        const userId = req.params.id
        dbConnect(db=>{
            db.collection("users")
            .findOne({_id:new ObjectId(userId)})
            .then(
                userData=>
                    res.render("single", {
                        pageTitle:"single User", userData
                    })
                )
            })
    }
    static edit =  (req, res)=> { 
        const userId = req.params.id
        dbConnect(db=>{
            db.collection("users")
            .findOne({_id:new ObjectId(userId)})
            .then(
                userData=>
                    res.render("edit", {
                        pageTitle:"Edit User", userData
                    })
                )
            })

    }
    static editLogic = (req,res)=>{
        dbConnect(db=>{
            db.collection("users")
            .updateOne(
                {_id:new ObjectId(req.params.id)},
                { $set:req.body }
            )
            .then(r=>res.redirect("/"))
        }  )
    }
    static delItem = (req,res)=>{
        const userId = req.params.id
        dbConnect(db=>
        db.collection("users")
        .deleteOne({_id:new ObjectId(userId)})
            .then(r=> res.redirect("/"))
        )
    }
}
module.exports = User;