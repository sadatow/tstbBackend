const express=require("express")
const router=express.Router()
const {setting,login,update,protect}=require("../contollers/loginController")
router.get("/setting",setting)
router.post("/",login)
router.post("/edit",protect,update)
module.exports=router