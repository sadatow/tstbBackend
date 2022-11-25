const express=require("express")
const router=express.Router()
const{addUser,getUsers,deleteUser}=require("../contollers/mailController")
const {protect}=require("../contollers/loginController")

router.get("/",getUsers)
router.post("/",addUser)
router.delete("/",protect, deleteUser)

module.exports=router