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
            db.collection('users').insertOne({
                name: user.name,
                age: user.age,
                status: "Active"
            })
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
                        pageTitle:"single User",
                        userData
                    })
                )
                .catch(e => console.log(e))
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
                        pageTitle:"Edit User",
                        userData,
                        isActive: userData.status == "Active"? true: false,
                        isInactive: userData.status == "Inactive"? true: false
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
            .catch(e => console.log(e))
        })
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