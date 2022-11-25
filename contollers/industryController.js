const{Industry}=require("../models")
const {Op}=require("sequelize")
const {decodeBase64}=require("../utils/decodeBase64")
const sharp=require("sharp")
const fs=require("fs")
const randomstring = require("randomstring")
exports.getAll=async(req,res,next)=>{
    try{
        let industry=await Industry.findAll({
            attributes:["id","name"]
        })
        return res.send(industry)
    }catch(err){
        console.log(err)
        return res.send("error")
    }
}
exports.getAllFront=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index

    try{
        let industry=await Industry.findAll({
            order:[["id","DESC"]],
            where:{sub:{[Op.not]: null}},
        })
        let sub=await Industry.findOne({where:{id:id}})
        console.log(sub.sub[index])
        sub=sub.sub[index]
        return res.send([industry,sub])
    }catch(err){
        console.log(err)
        return res.status(400).send("error")
    }
}
exports.getOneIndsutry=async(req,res,next)=>{
    let id=req.query.id
    try{
        let industry=await Industry.findOne({where:{"id":id},attributes:["name","sub","id"]})
        return res.send(industry)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editIndustry=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let id=req.query.id
    try {
        await Industry.update({name:name},{where:{"id":id}})
        return res.status(200).send({status:200})
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    } 
}
exports. deleteIndustry=async(req,res,next)=>{
    let id=req.query.id
    try{
        await Industry.destroy({where:{"id":id}})
        return res.send({status:200})
    }catch(err){
        console.log(err)
        return res.status(500).send("error")
    }
}
exports.addIndustry=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        await Industry.create({name:name})
        return res.status(200).send({status:200})
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneSubcategory=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    try{
        let sub=await Industry.findOne({where:{"id":id}})

        return res.send(sub.sub[index])
    }catch(err){
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.addSubcategory=async(req,res,next)=>{
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let path="industry/"
    let text={
        tm:await decodeBase64(req.body.text,path),
        ru:await decodeBase64(req.body.text2,path),
        en:await decodeBase64(req.body.text3,path)
    }
    let title={
        tm:req.body.tmheader,
        ru:req.body.ruheader,
        en:req.body.enheader
    }
    let id=req.query.id
    let oldSub=[]
    try {
        let subcategory=await Industry.findOne({where:{"id":id}})
        if (subcategory.sub!=null) {
            subcategory.sub.forEach(e=>{
                oldSub.push(e)
            })
        }
        let obj={
            name:name,
            text:text,
            title:title
        }
        oldSub.push(obj)
        let index=oldSub.length
        subcategory=await Industry.update({sub:oldSub},{where:{"id":id}})

        return res.send({id:Number(id),index:index-1})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSubcategory=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let sub
    let files=null
    try {
        sub=await Industry.findOne({where:{"id":id}})
        files=sub.sub[index].pic
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"something went wrong"})
    }

    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let path="industry/"
    let text={
        tm:await decodeBase64(req.body.text,path),
        ru:await decodeBase64(req.body.text2,path),
        en:await decodeBase64(req.body.text3,path)
    }
    let title={
        tm:req.body.tmheader,
        ru:req.body.ruheader,
        en:req.body.enheader
    }
    let obj={
        name:name,
        pic:files,//suratlar db den cekilen
        text:text,
        title:title
    }
    try {
        sub.sub.splice(index,1,obj)

        await Industry.update({sub:sub.sub},{where:{"id":id}})
        return res.status(200).send({id:Number(id),index:Number(index)})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.deleteSubcategory=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let sub
    try {
        sub=await Industry.findOne({where:{"id":id}})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")        
    }
    sub.sub.splice(index,1)
    console.log(sub.sub);
    try {
        await Industry.update({sub:sub.sub},{where:{"id":id}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }

}
exports.addPic=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let files
    try {
        files=await Industry.findOne({where:{id:id}})
        if(files.sub!=null){
            files=files.sub
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }

    try {
        let file=req.files.pic0
        let filename=randomstring.generate(7)+".webp"
        let buffer=await sharp(file.data).resize(680,400).toBuffer()
        await sharp(buffer).toFile("./public/industry/"+filename)
        if(files[index].pic!=null){
            fs.unlink("./public/industry/"+files[index].pic,(err) => {if(err){console.log(err)}})
        }
        files[index].pic=filename
        await Industry.update({sub:files},{where:{"id":id}})  
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"Yalnyshlyk cykdy gaytadan yuklap gorun"})
    }

}
