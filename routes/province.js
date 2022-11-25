const express=require("express")
const { protect } = require("../contollers/loginController")
const {addSettings,editProvince,getProvince}=require("../contollers/provinceController")
const router=express.Router()
router.get("/addSettings",addSettings)
router.get("/getProvince",getProvince)
router.post("/editProvince",protect, editProvince)
module.exports=router