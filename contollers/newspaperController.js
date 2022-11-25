const {Newspaper}=require("../models")
const fs=require("fs")
const randomstring = require("randomstring")
const sharp=require("sharp")
const {searchFromNewspaper}=require("../utils/searchFrom")
exports.getAllNewspapers=async(req,res,next)=>{
    try{
        let newspaper=await Newspaper.findAll({order:[["id","DESC"]]})
        return res.status(200).send(newspaper)
    }catch(err){
        console.log(err)
        return res.json({"err":"something went wrong"})
    }
}
exports.getAllNewspaperFront=async(req,res,next)=>{
    try{
        let newspaper=await Newspaper.findAll({order:[["id","DESC"]],where:{"active":"true"}})
        return res.status(200).send(newspaper)
    }catch(err){
        console.log(err)
        return res.json({"err":"something went wrong"})
    }
}
exports.addNewspaper=async(req,res,next)=>{
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let date=req.body.date
    let active=req.body.active
    try{
        const newspaper=await Newspaper.create({name:name,date:date,active:active})
        return res.json({id:newspaper.id})
    }catch(err){
        console.log(err)
        return res.status(400).json({"err":"something went wrong"})
    }
}
exports.getOneNewspaper=async(req,res,next)=>{
    let id=req.query.id
        try{
            let paper=await Newspaper.findOne({where:{"id":id}})
            return res.status(200).send(paper)
        }catch(err){
            console.log(err)
            return res.status(400).send("something went wrong")
        }
}
exports.editNewspaper=async(req,res,next)=>{
    let id=req.query.id
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let date=req.body.date
    let active=req.body.active
    try {
        await Newspaper.update({name:name,date:date,acitve:active},{where:{"id":id}})
        return res.send({id:id})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.deleteNewspaper=async(req,res,next)=>{
    let id=req.query.id
    let filename
    try{
        let file=await Newspaper.findOne({where:{"id":id}})
        filename=file.filename
    }catch(err){
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    try {
        await Newspaper.destroy({where:{"id":id}})
        fs.unlink("./public/newspapers/"+filename,(err)=>{if(err){console.log(err)}})
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.addPic=async(req,res,next)=>{
    let id=req.query.id
    let filename1
    try {
        let logo=await Newspaper.findOne({where:{id:id}})
        filename1=logo.pic
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    let pic=req.files.pic0
    let filename=randomstring.generate(7)+".jpg"
    let buffer=await sharp(pic.data).resize(350,500).toBuffer()
    await sharp(buffer).toFile("./public/newspapers/pic/"+filename)
    try {
        await Newspaper.update({logo:filename},{where:{id:id}})
        if(filename1!=undefined){
            fs.unlink("./public/newspapers/pic/"+filename1,(err)=>{if(err){console.log(err)}})
        }
        return res.status(200).json(id)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.addFile = async(req,res,next) => {
    let id=req.query.id
    let oldFile
    try {
        oldFile=await Newspaper.findOne({where:{id:id}})
        oldFile=oldFile.filename
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    let file=req.files.pic0
    let filename=file.name
    file.mv("./public/newspapers/files/"+filename,(err)=>{if(err){console.log(err)}})
    try {
        await Newspaper.update({filename:filename},{where:{id:id}})
        if(oldFile!=undefined){fs.unlink("./public/newspapers/files/"+oldFile,(err)=>{if(err){console.log(err)}})}
        return res.status(200).json(id)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}   
exports.isActiveNewspaper=async(req,res,next)=>{
    let id=req.body.id
    let active=req.body.data
    try {
        await Newspaper.update({active:active},{where:{id:id}})
        return res.status(200).send("success")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.downloadFile=async(req,res,next)=>{
    let filename=req.query.file
    res.sendFile(filename,{root:"./public/newspapers/files"});
}
exports.search=async(req,res)=>{
    let search 
    let text=req.query.text
    try{
        search=await Newspaper.findAll({order:[["id","DESC"]]})
    }catch(err){
        console.log(err)
        return res.json({"err":"something went wrong"})
    }
    let result=searchFromNewspaper(search,text)
    return res.send(result)
}

