const{Member}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
const rimraf=require("rimraf")
const randomstring=require("randomstring")
const {searchFromMembers}=require("../utils/searchFrom")
exports.allMembers=async(req,res,next)=>{
    try {
        let members=await Member.findAll({order: [["id","DESC"]]})

        return res.json(members)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.mainMembers=async(req,res,next)=>{
    try{
        let members=await Member.findAll({
            order:[
                ['id',"DESC"]
            ],
            where:{"main":"true"},
            attributes:["uuid","pic","name"]
        })
        return res.json(members)
    }catch(err){
        console.log(err)

        return res.json({"err":"something went wrong"})
    }
}
exports.getBycategory=async(req,res,next)=>{
    try {
        let members=await Member.findAll({order: [["id","DESC"]],where:{category:req.params.category}})
        return res.json(members)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.addMember=async(req,res,next)=>{
    let name=req.body.name
    let name1=name
    let link=req.body.web
    let member=req.body.member
    let email=req.body.email
    let address={
        tm:req.body.tmAddress,
        ru:req.body.ruAddress,
        en:req.body.enAddress
    }
    let body={
        tm:req.body.text,
        ru:req.body.text2,
        en:req.body.text3
    }
    let extra=req.body.extra
    let welayat=req.body.welayat
    let main=req.body.main
    let members=[]
    if(typeof(member)=="string"){
        members.push(member)
    }else{
        members=member
    }
    let member1
    try{
        member1=await Member.create({name:name1,link:link,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main,address:address})
        fs.mkdir("./public/members/"+member1.id,(err)=>{if(err){console.log(err)}})
        fs.mkdir("./public/members/"+member1.id+"/docs",(err)=>{if(err){console.log(err)}})
        return res.json({id:member1.id})
    }catch(err){
        console.log(err)
        rimraf("./public/members/"+member1,()=>{console.log("done 74")})
        return res.status(400).json({err:"something went wrong"})
    }
}
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    try {
        let member=await Member.findOne({where:{"id":id}})
        return res.send(member)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editMember = async(req, res,next) => {
    let id=req.query.id
    let name=req.body.name
    let link=req.body.web
    let member=req.body.member
    let email=req.body.email
    let body={
        tm:req.body.text,
        ru:req.body.text2,
        en:req.body.text3
    }
    let extra=req.body.extra
    let welayat=req.body.welayat
    let main=req.body.main
    let members=[]
    if(typeof(member)=="string"){
        members.push(member)
    }else{
        members=member
    }
    try{
        await Member.update({name:name,link:link,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main},{where:{"id":id}})
        return res.status(200).send({status:'success'})
    }catch(err){
        console.log(err)
        return res.status(400).json({err:"something went wrong"})
    }
}
exports.deleteMember=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Member.destroy({where:{id:id}})
        rimraf("./public/members/"+id,(err)=>{if(err){console.log(err)}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.addPic=async(req,res,next)=>{
  let filename1
  let id=req.query.id
  let filename
  let name
  let picture=await Member.findOne({where:{id}})
  filename1=picture.pic
    let pic=req.files.pic0
    filename=pic.name.split(".")[0]+".jpg"
    let buffer=await sharp(pic.data).resize(64,64).toBuffer()
    if(filename1!=undefined){
      fs.unlink("./public/members/"+id+"/"+filename1,(err)=>{if(err){console.log(err)}})
    }
    await sharp(buffer).toFile("./public/members/"+id+"/"+filename)
    try {
        await Member.update({pic:filename},{where:{id:id}})
    return res.status(200).json({status:"success"})
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }
}
////////////////
exports.addFile=async(req,res,next)=>{
    let filename1
    let id=req.query.id
    let filename
    let allfiles=[]
    let name
    try {
      filename=await Member.findOne({where:{id:id}})
      if(filename.files!=null){
        allfiles=filename.files
      }
      name=filename.name
    }catch (err) {
      console.log(err)
      return res.status(400).send("something went wrong")
    }
    let pic=Object.values(req.files)
    if(typeof(filename)=="string"){allfiles.push(filename)}
    for(let i=0;i<pic.length;i++){
          filename=pic[i].name
          await pic[i].mv("./public/members/"+id+"/docs/"+filename,(err)=>{if(err){console.log(err)}})
          let obj={
              filename:filename,
              size:size(pic[i].size)
          }
          allfiles.push(obj)
      }
    try {
      await Member.update({files:allfiles},{where:{"id":id}})
      return res.status(200).json({status:"success"})
    }catch (err) {
      console.log(199,err)
      return res.status(400).json({err:"something went wrong"})
    }
}
exports.deleteFile=async(req,res,next)=>{
    let id = req.query.id
    let index = req.query.index
    let allFiles=[]
    try {
        let file=await Member.findOne({where: {id:id}})
        allFiles=file.files
        let filename=allFiles.splice(index,1)
        fs.unlink("./public/members/"+id+"/docs/"+filename[0].filename,(err)=>{if(err){console.log(err)}})
        await Member.update({files:allFiles},{where:{"id":id}})
        return res.status(200).send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }

}
exports.search=async(req,res,next)=>{
    let search
    let text=req.query.text
    try {
        search=await Member.findAll({order: [["id","DESC"]]})
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
    let result=searchFromMembers(search,text)
    console.log(result)
    return res.send(result)
}
exports.download=async(req,res,next)=>{
    let {file,id}=req.query
    let path="./public/members/"+id+"/docs"
    res.sendFile(file,{root:path});
}
function size(file){

    let size = 0
    let status
    size=Math.round(file/1024)
    status="Kb"
    if(size>1024){
      size=size/1024
      size=size.toFixed(2)
      status="Mb"
    }
    console.log(size+status)
    return size+status
}
