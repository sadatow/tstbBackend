const express=require("express")
const router=express.Router()
const{allConstructors,addConstructor,addSubcategory,getOneSubcategory,editSubcategory,deleteConstructor,getOneConstructor,addPic,getOneConstructorSimple,
editConstructor,deleteSubcategory,addVideo, allConstructorsPro,addTestPic,addFile,deleteFile,search,download}=require("../contollers/constructorController")
const { protect } = require("../contollers/loginController")
router.get("/",allConstructors)
router.get("/all",allConstructorsPro)
router.get("/getOne",getOneConstructor)
router.get("/getOneSimple",getOneConstructorSimple)
router.post("/edit",protect, editConstructor)
router.post("/",protect, addConstructor)
router.delete("/",protect, deleteConstructor)
router.delete("/deleteFile",protect, deleteFile)
router.post("/subCategory",protect, addSubcategory)
router.get("/subCategory/getOne",getOneSubcategory)
router.post("/subCategory/edit",protect, editSubcategory)
router.delete("/subCategory",protect, deleteSubcategory) 
router.post("/addVideo",protect, addVideo)
router.post("/addPic",protect, addPic)
router.post("/addFile",protect, addFile)
router.get("/searchAdmin",protect, search)
router.get("/download",download)
module.exports=router