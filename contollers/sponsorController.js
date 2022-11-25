const {Sponsor}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
const randomstring = require("randomstring")
exports.getSponsers=async(req,res,next)=>{
    try{
        let sponsor=await Sponsor.findAll({})
        return res.send(sponsor) 
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getAll=async(req,res,next) =>{
    try {
        let sponsor=await Sponsor.findAll({order:[["id","DESC"]]})
        return res.status(200).send(sponsor)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}
exports.addSponsor=async(req,res,next)=>{
    let name=req.body.name
    let link=req.body.link
    let active=req.body.active //dba gosh
    try{
        let sponsor=await Sponsor.create({name:name,active:active,link:link})
        return res.send({id:sponsor.id})
    }
    catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    try{
        let sponser=await Sponsor.findOne({where:{"id":id}})
        return res.send(sponser)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSponsor=async(req,res,next)=>{
    let id=req.query.id
    let name=req.body.name
    let link=req.body.link
    let active=req.body.active
    try {
        await Sponsor.update({name:name,link:link,active:active},{where:{"id":id}})
        return res.status(200).send({id:Number(id)})
    } catch (err) {
        console.log(err)
        return res.status(400).send("somthing went wrong")
    }
}
exports.deleteSponsor=async(req,res,next)=>{
    let id=req.query.id
    try{
        await Sponsor.destroy({where:{"id":id}})
        return res.send({status:200})
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.addPic=async(req,res,next)=>{
    let id=req.query.id
    let filename
    try {
        file=await Sponsor.findOne({where:{id:id}})
        if(file.pic!=null){
            filename=file.pic
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send("Suratda problema yuze cykdy")
    }
    let pic=req.files.pic0
    let a=await sharp(pic.data).toBuffer()
    if(filename!=undefined){
        fs.unlink("./public/sponsor/"+filename,(err) => {if(err){console.log(err)}})
    }
    filename=pic.name.split(".")[0]+".jpg"
    await sharp(a).toFile("./public/sponsor/"+filename)
    try {
        await Sponsor.update({pic:filename},{where:{"id":id}})
        return res.status(200).send({status:200})
    } catch (err){
        console.log(err)
        return res.status(400).send({status:400})
    }    
}
exports.isActive=async(req,res,next)=>{
    let id=req.query.id
    let active=req.body.active
    try {
        await Sponsor.update({active:active},{where:{id:id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"something went wrong"})
    }
}

