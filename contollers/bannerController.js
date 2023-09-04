const {Banners}=require("../models")
const sharp=require("sharp")
const randomstring=require("randomstring")
const fs=require("fs")
const {searchFromBanner}=require("../utils/searchFrom")
exports.allBanners=async(req,res,next)=>{
    try{
        let banners=await Banners.findAll({
            order:[
                ["id","ASC"]
            ],
            attributes:["id","banner"]
        })
        return res.json(banners)
    }catch(err){
        console.log(err)
        return res.status(500).json({"err":"something went wrong"})
    }
}
exports.uploadPic=async(req,res,next)=>{
    let file
    console.log(req.files)
    if(req.files.pic0==null){
        return res.json({"status":"ici bosh"})
    }else{
    file=req.files.pic0}
    let id=req.query.id
    let index=req.query.index
    let allBanners
    try {
        allBanners=await Banners.findOne({where:{id:id}})
        allBanners=allBanners.banner
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    let filename
    console.log(file.mimetype=="image/gif")
    if(file.mimetype=="image/gif"){
        filename=randomstring.generate(7)+".gif"
        file.mv("./public/banners/"+filename,(err)=>{if(err){console.log(err)}})
    }else{
        filename=randomstring.generate(7)+".jpg"
        let buffer=await sharp(file.data).resize(1100,234).toBuffer()
        await sharp(buffer).toFile("./public/banners/"+filename)
    }
    allBanners[index].pic=filename
    try {
        await Banners.update({banner:allBanners},{where:{"id":id}})
        return res.status(200).send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.addBannersSettings=async(req,res,next)=>{
    try{
        await Banners.create()
        await Banners.create()
        await Banners.create()
        return res.json("sucess")
    }catch(err){
        console.log(err)
        return res.json("smth went wwrong")
    }
}
exports.addBanners=async(req,res,next)=>{
    let id=req.query.id
    let web=req.body.link
    let name=req.body.name
    let active=req.body.active

    console.log(req.body)
    let banner={
        pic:"",
        link:web,
        name:name,
        active:active,
    }
    let allBanners=[]
    try{
        let banners=await Banners.findOne({where:{id:id}})
        
        if (banners.banner!=null || banners.banner!=undefined){
            banners.banner.forEach(e=>{
                allBanners.push(e)
            })
        }
        allBanners.push(banner)
        banners=await Banners.update({banner:allBanners},{where:{id:id}})
        return res.status(200).send({index:(allBanners.length-1).toString()})
    }catch(err){
        console.log(err)
        return res.status(400).json({err:"smth went wrong"})
    }
}
exports.editBanner=async(req,res,next)=>{
    let index=req.query.index
    let id=req.query.id
    let web=req.body.web
    let active=req.body.active
    let name=req.body.name
    let all=[]
    try{
        let banner=await Banners.findOne({
            where:{"id":id},
            attributes:["banner"]
        })
        if(banner.banner.length!=0 || banner.banner.length!=undefined){
            banner.banner.forEach(e=>{
                all.push(e)
            })
        }
        all[index].link=web
        all[index].active=active
        all[index].name=name
        await Banners.update({banner:all},{where:{"id":id}})
        return res.status(200).json({status:"sucess"})
    }catch(err){
        console.log(err)
        return res.status(500).json({"err":"smth went wrong"})
    }

}
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    try {
        let banner=await Banners.findOne({where:{id:id}})

        return res.status(200).send(banner)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")

    }
}
exports.getOneBanner=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    try {
        let banner=await Banners.findOne({where:{id:id}})
        console.log(banner.banner[index])
        return res.status(200).send(banner.banner[index])
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")

    }
}
exports.deleteBanner=async(req,res,next)=>{
    let index = req.query.index
    let id=req.query.id
    let allBanners
    try {
        allBanners=await Banners.findOne({where:{id:id}})
        allBanners=allBanners.banner
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    allBanners.splice(index,1)
    try {
        allBanners=await Banners.update({banner:allBanners},{where:{id:id}})
        return res.status(200).send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.isActiveBanners=async(req,res,next)=>{
    let id=req.query.id
    let index=req.body.id

    let active=req.body.data

    try {
        let banner=await Banners.findOne({where:{id:id}})
        banner.banner[index].active=active
        await Banners.update({banner:banner.banner},{where:{id:id}})
        return res.status(200).send("dyndy")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
// exports.search=async(req,res,next)=>{
//     let id=req.query.id
//     let search
//     let text=req.query.text
//     console.log(id)
//     try {
//         search=await Banners.findOne({where:{id:id}})
//     } catch (err) {
//         console.log(err)
//         return res.status(400).send("something went wrong")

//     }
//     let result = searchFromBanner(search,text)
//     return res.send(result)
// }
