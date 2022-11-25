const {Commerce,CommerceCategory}=require("../models")
const fs=require("fs")
const sharp = require("sharp")
const rimraf = require("rimraf")
const randomstring = require("randomstring")
const {searchFromCommerce}=require("../utils/searchFrom")
exports.getMain=async(req,res,next)=>{
    let welayat=shBarla(req.query.welayat)
    try {
        let commerce=await CommerceCategory.findAll({order:[["id","DESC"]],include:{association:"commerce",where:{welayat:welayat}}
        })
        return res.send(commerce)
    } catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong")
    }
}
exports.getAll=async(req,res,next)=>{
    try {
        let commerce=await Commerce.findAll({order:[["id","DESC"]]},{include:"category"})
        return res.send(commerce)
    } catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong")
    }
}
exports.addCommerce=async(req,res,next)=>{
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let address={
        tm:req.body.tmaddress,
        ru:req.body.ruaddress,
        en:req.body.enaddress
    }
    let commerceId=req.body.category
    let welayat=req.body.welayat
    let category=req.body.category
    let website=req.body.web
    let number=req.body.telefon
    let email=req.body.email 
    try {
        let commerce=await Commerce.create({name:name,welayat:welayat,number:number,category:category,website:website,commerceId:commerceId,address:address,email:email})
        fs.mkdir("./public/commerce/"+commerce.id,(err)=>{if(err){console.log(err);}})
        return res.status(200).send({id:commerce.id})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.addPic=async(req,res,next)=>{
let id=req.query.id
let surat=[]
let newfiles=[]
try {
    let commerce=await Commerce.findOne({where:{id:id}})
    if(commerce.pic!=null){
        surat=commerce.pic
    }
} catch (err) {
    console.log(err)
    return res.status(400).send({message:"something went wrong"})
}
    let pic=Object.values(req.files)
    for(let i=0; i<pic.length; i++) {
        let a=await sharp(pic[i].data).resize(571,278).toBuffer()
        let filename=randomstring.generate(7)+".jpg"
        await sharp(a).toFile("./public/commerce/"+id+"/"+filename)
        surat.push(filename)
        newfiles.push(filename)
    }    
    console.log(surat,465,newfiles)
    try {
        await Commerce.update({pic:surat},{where:{"id":id}})
        return res.status(200).send({status:200})
    }catch (err) {
        console.log(err)
        return res.status(400).send({status:"erorr"})
        }
    }
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    try {
        let commerce=await Commerce.findOne({where:{"id":id}})
        let category=await CommerceCategory.findAll({order: [["id","DESC"]]})
        return res.status(200).send([commerce,category]) 
    } catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong")
    }
}
exports.editCommmerce=async(req,res,next)=>{
    let commerceId=req.body.category
    let id=req.query.id
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let address={
        tm:req.body.tmaddress,
        ru:req.body.ruaddress,
        en:req.body.enaddress
    }
    let welayat=req.body.welayat
    let website=req.body.web
    let number=req.body.telefon
    let email=req.body.email
    try {
        await Commerce.update({name:name,welayat:welayat,number:number,commerceId:commerceId,website:website,email:email,address:address},{where:{"id":id}})
        return res.status(200).send({id:id})
        
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong129")
    }
    
}
exports.deleteCommerce=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Commerce.destroy({where:{"id":id}})
        rimraf("./public/commerce/"+id,(err)=>{if(err){console.log(err 
            )}})
        return res.status(200).send({status:"success"})
    } catch (err) {
        console.log(err)
        return res.send("something went wrong")
    }
}
exports.deletePic=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let commerce
    try {
        commerce=await Commerce.findOne({where: {id:id}})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
    let pics=commerce.pic
    let cut=pics.splice(index,1)
    console.log(cut,pics)
    try {
        await Commerce.update({pic:pics},{where:{"id":id}})
        fs.unlink("./public/commerce/"+id+"/"+cut,(err)=>{if(err){console.log(err)}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")        
    }
}
exports.addCategory=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        await CommerceCategory.create({name:name})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.getCategorySimple=async(req,res,next)=>{
    try {
        let commerce=await CommerceCategory.findAll()
        return res.send(commerce)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
        
    }
}
exports.getCategory =async(req,res,next)=>{
    try {
        let commerce=await CommerceCategory.findAll({include:"commerce"})
        return res.send(commerce)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
        
    }
}
exports.deleteCategory =async(req,res,next)=>{
    let id=req.query.id
    try {
        await CommerceCategory.destroy({where:{id:id}})
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.send(500).send("something went wrong")
    }
}
exports.search=async(req,res,next)=>{
    let search 
    let text=req.query.text
    try {
        search=await Commerce.findAll({order:[["id","DESC"]]})
    }catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    let result=searchFromCommerce(search,text)
    return res.send(result)
}
function shBarla(welayat){
    let newwelayat=""
    for (let i=0; i<welayat.length; i++){
        if(welayat[i]+welayat[i+1]=="sh"){
            newwelayat+="ş"
            i+=1
        }else{
            newwelayat+=welayat[i]
        }
    }
    return newwelayat
}
