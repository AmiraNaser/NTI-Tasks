
const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.home);
router.get("/single/:id",userController.single);
router.get("/add", userController.addUser);
router.post("/add", userController.addLogic);
router.get("/edit/:id",userController.edit);
router.post("/edit/:id",userController.editLogic);
router.get("/delete/:id", userController.delItem);
router.get("/status/:id", userController.status);
module.exports = router