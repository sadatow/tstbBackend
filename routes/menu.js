const express =require("express")
const { protect } = require("../contollers/loginController")
const router=express.Router()
const {addSettings,getMembership,getAboutUs,getConsultation,
addPic,editMembership,editAboutUs,editConsultation,
getAllBussiness,getAllLicense,getOneBussiness,getOneLicense,
addBussiness,editBussiness,addBussinessFile,deleteBussinessFile,deleteBussiness,addMembershipFile,
deleteMembershipFile,addLicense,editLicense,deleteLicense,addLicenseFile,deleteLicenseFile,getLicenseHeader,
addStatistika,getStatistika,editStatistika,addOne,searchBussiness,searchLicense,download,downloadBussiness,downloadLicense
}=require("../contollers/menuController")
router.get("/addSettings", addSettings)
router.get("/getMembership",getMembership)
router.get("/getConsultation",getConsultation)
router.get("/addStatistika",addStatistika)
router.get("/getStatistika",getStatistika)
router.post("/statistikaAdmin",protect, editStatistika)
router.get("/addOne",addOne)
router.get("/getAboutUs",getAboutUs)
router.post("/addPic",protect,addPic)
router.post("/editConsultation",protect,editConsultation)
router.post("/editMembership",protect,editMembership)
router.post("/addFile",protect,addMembershipFile)
router.delete("/deleteFile",protect,deleteMembershipFile)
router.post("/editAboutUs",protect,editAboutUs)
router.get("/getAllBussiness",protect,getAllBussiness)
router.get("/getAllLicense",getAllLicense)
router.get("/getLicenseHeader",getLicenseHeader)
router.get("/getOneBussiness",getOneBussiness)
router.get("/bussiness/searchAdmin",protect,searchBussiness)
router.get("/bussiness/download",downloadBussiness)
router.get("/getOneLicense",getOneLicense)
router.post("/addBussiness",protect,addBussiness)
router.post("/editBussiness",protect,editBussiness)
router.delete("/deleteBussiness",protect,deleteBussiness)
router.post("/addBussinessFile",protect,addBussinessFile)
router.delete("/deleteBussinessFile",protect,deleteBussinessFile)
router.get("/license/download",downloadLicense)
router.post("/addLicense",protect,addLicense)
router.post("/editLicense",protect,editLicense)
router.post("/addLicenseFile",protect,addLicenseFile)
router.delete("/deleteLicense",protect,deleteLicense)
router.delete("/deleteLicenseFile",protect,deleteLicenseFile)
router.get("/license/searchAdmin",protect,searchLicense)
router.get("/download",download)
module.exports =router