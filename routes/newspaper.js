const express=require("express")
const { protect } = require("../contollers/loginController")
const router=express.Router()
const {getAllNewspapers,addNewspaper,getOneNewspaper,editNewspaper,deleteNewspaper,addPic,addFile,isActiveNewspaper, downloadFile,getAllNewspaperFront,search}=require("../contollers/newspaperController")
router.get("/",protect, getAllNewspapers)
router.get("/front",getAllNewspaperFront)
router.post("/add",protect,addNewspaper)
router.post("/addPic",protect,addPic)
router.post("/addFile",protect,addFile)
router.get("/getOne",getOneNewspaper)
router.post("/edit",protect,editNewspaper)
router.delete("/",protect,deleteNewspaper)
router.post("/isActiveNewspaper",protect,isActiveNewspaper)
router.get("/download",downloadFile)
router.get("/searchAdmin",protect,search)
module.exports=router
