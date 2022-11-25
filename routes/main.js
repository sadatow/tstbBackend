const express=require("express")
const router=express.Router()
const {getAll}=require("../contollers/mainPageController")
router.get("/",getAll)
router.get("/something",function(req,res){
    res.send("bolaydy")
})
module.exports=router