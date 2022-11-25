const {Op}=require("sequelize")
const sharp = require("sharp");
const {Events,Banners,News_tags}=require("../models/");
const{searchFromNews}=require("../utils/searchFrom")
const {decodeBase64}=require("../utils/decodeBase64")
const fs = require("fs")
const randomstring = require("randomstring")

exports.getAll=async(req,res,next)=>{
  try {
    let event=await Events.findAll({order:[["id","DESC"]]})
    return res.send(event)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.addEvent=async (req,res,next)=>{
  let path="events/"
  let name=req.body.name
  let body={
    TM:await decodeBase64(req.body.text,path),
    RU:await decodeBase64(req.body.text2,path), 
    EN:await decodeBase64(req.body.text3,path)
  }
  let tags=req.body.tag
let header={
    TM:req.body.headerTM,
    RU:req.body.headerRU,
    EN:req.body.headerEN
}
  let date=req.body.date
  let topar=req.body.topar
  let active=req.body.active
  let status=req.body.status
  try{
    let event=await Events.create({header:header,date:date,body:body,tags:tags,active:active,status:status,name:name,topar:topar})
    return res.send({newsId:event.id})
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editEvent=async(req,res,next)=>{
  let path="events/"
  let body={
    TM:await decodeBase64(req.body.text,path),
    RU:await decodeBase64(req.body.text2,path), 
    EN:await decodeBase64(req.body.text3,path)
  }
  let tags=req.body.tag
  let header={
    TM:req.body.headerTM,
    RU:req.body.headerRU,
    EN:req.body.headerEN
  }
  let date=req.body.date
  
  let active=req.body.active
  let status=req.body.status
  let name=req.body.name
  let id=req.query.id
  try{
    let news=await Events.update({header:header,date:date,body:body,tags:tags,active:active,status:status,name:name},{where:{id:id}})
    return res.status(200).send({newsId:id})
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
} 
exports.eventsByTag=async(req,res,next)=>{
  let tag=req.query.tag
  try{
    let news=await Events.findAll({
     where:{ tags: { [Op.contains]: [tag] }}
    })
    return res.json(news)
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
}
exports.getMain=async(req,res,next)=>{
  let obj={}
  try{
    let news=await Events.findAll({
      order:[["id","DESC"]],
      limit:9,
      attributes:["title","body","pic","date","name","uuid"]
    })
    obj.list=news
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let banner=await Banners.findAll({})
    obj.ads=banner

  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let tags=await News_tags.findAll({
      attributes:["uuid","ru","tm","en"]
    })
    obj.tags=tags
  }catch(err){}
  return res.send(obj)
}
exports.deleteEvent=async(req,res,next)=>{
  let id=req.query.id
  try{
    let news=await Events.destroy({
      where:{"id":id}
    })
    return res.status(200).send(news.toString())
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.getOneEvent=async (req,res,next)=>{
  let id=req.query.id
  try {
    let event=await Events.findOne({
      where:{"id":id}
    })
    let tags=await News_tags.findAll({order: [["id","DESC"]]})
    return res.send([event,tags])
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.getOneEventFront=async(req,res,next)=>{
  let id=req.query.id
  try {
    let event=await Events.findOne({
      where:{"id":id}
    })
    return res.send(event)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.loadMore=async (req,res,next)=>{
  let page=req.query.page
  let limit=req.query.limit
  let startIndex=(+page)*limit
  let endIndex=(+page+1)*limit
  let events
  let tag=req.query.tag
  if(tag!="undefined"){
   
    events=await Events.findAll({
      order:[["id","DESC"]],where:{"active":"true"},
      where:{ tags: { [Op.contains]: [tag] }}
    })
  }else{
   
      events=await Events.findAll({
      order:[["id","DESC"]],where:{"active":"true"}})
  }
  return res.send(events.splice(startIndex,limit))
}
exports.addPicture=async(req,res,next)=>{
  let filename1
  let id=req.query.id
  let filename
  try {
    filename=await Events.findOne({where:{id:id}})
    console.log(filename)
    if(filename.pic!=null){
      filename1=filename.pic
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
    let pic=req.files.pic0
    filename=randomstring.generate(7)+".webp"
    let buffer=await sharp(pic.data).webp({quality:90}).resize(1100,620).toBuffer()
    await sharp(buffer).toFile("./public/events/"+filename)
    try {
    await Events.update({pic:filename},{where:{"id":id}})
    if(filename1!=undefined){
      fs.unlink("./public/events/"+filename1,(err)=>{if(err){console.log(err)}})
    }
    return res.status(200).send({status:"success"})
  }catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.getTags=async(req,res,next) => {
  try {
    let tags=await News_tags.findAll({order:[["id","DESC"]]})
    return res.send(tags)
  } catch (err) {
    console.log(err)
    return res.status(400).send("Something went wrong")
  }
}
exports.isActiveEvent=async(req,res,next)=>{
  let active=req.body.data
  let id=req.body.id
  try {
    await Events.update({active:active},{where:{"id":id}})
    return res.status(200).send("sucesss")
  } catch (err) {
    console.log(err)
    return res.status(400).send("Something went wrong")
  }
}
exports.search=async(req,res,next)=>{
  let search
  let text=req.query.text
  try {
    search=await Events.findAll({order:[["id","DESC"]]})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
  let result=searchFromNews(search,text)
  return res.send(result)
}
