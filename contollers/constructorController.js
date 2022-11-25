const {Constructor,Constructorcategory}=require("../models")
const {sequelize}=require("sequelize");
const {searchFromConstructor}=require("../utils/searchFrom")
const randomstring = require("randomstring")
const{decodeBase64Array,decodeBase64Constructor}=require("../utils/decodeBase64")
const fs=require("fs")
const sharp= require("sharp")
const rimraf=require("rimraf")
let searchId
exports.addConstructor=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        await Constructorcategory.create({name:name})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.allConstructors=async(req,res,next)=>{
    try {
        let constructor=await Constructorcategory.findAll({order: [["id","DESC"]]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("yalnyshlyk")
    }
}
exports.allConstructorsPro=async(req,res,next)=>{
    try {
        let constructor=await Constructorcategory.findAll({order: [["id","ASC"]],include:{association:"constructors",attributes:["id","name"]}})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.getOneConstructor=async(req,res,next)=>{
    let id=req.query.id
    searchId=id
    try {
        let subcategory=await Constructor.findAll({where:{constructorId:id}})
        let result=sort(subcategory)
        return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneConstructorSimple=async(req,res,next)=>{
    let id=req.query.id
    try {
        let constructor=await Constructorcategory.findOne({where:{"id":id},include:["constructors"]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editConstructor=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let id=req.query.id
    try {
        await Constructorcategory.update({name:name},{where:{id:id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.deleteConstructor=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Constructorcategory.destroy({where:{id:id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.download=async(req,res,next)=>{
    let {file,id}=req.query
    let path="./public/constructor/"+id
    res.sendFile(file,{root:path});
}

exports.addSubcategory=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let path="constructor/"
    let body={
        TM:await decodeBase64Constructor(req.body.text,path),
        RU:await decodeBase64Constructor(req.body.text2,path),
        EN:await decodeBase64Constructor(req.body.text3,path)
    }
    let header={
        TM:req.body.tmheader,
        RU:req.body.ruheader,
        EN:req.body.enheader
    }
    let category=req.body.category
    let shablon=req.body.shablon 
    let banner=req.body.banner
    try {
        let subcategory=await Constructor.create({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon})
        fs.mkdir("./public/constructor/"+subcategory.id,(err)=>{if(err){console.log(err)}})
        return res.send({id:subcategory.id})
    }catch (err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneSubcategory=async(req,res,next)=>{
    let boshmy=false
    let id=req.query.id
    try {
        let category = await Constructor.findOne({where:{id:id},include:"banner"})
        if(category.pic!=null){
            category.pic.forEach((e,i)=>{
            if(e==" "){category.pic.splice(i,1);boshmy=true}
        })
        if(boshmy){await Constructor.update({pic:category.pic},{where:{id:id}})
        category = await Constructor.findOne({where:{id:id}})
    }
}
    return res.send(category)
}  
    catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSubcategory=async(req,res,next) => {
    let files 
    let allfiles=[]
    let id=req.query.id
    let constructorId
  try {
    files=await Constructor.findOne({where:{id:id}})
    allfiles=files.pic
    constructorId=files.constructorId
  } catch (err) {
    console.log(err)
    return res.status(400).send({message:"something went wrong"})
  }
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let path="constructor/"
    let body={
        TM:await decodeBase64Constructor(req.body.text,path),
        RU:await decodeBase64Constructor(req.body.text2,path),
        EN:await decodeBase64Constructor(req.body.text3,path)
    }
    let header={
        TM:req.body.tmheader,
        RU:req.body.ruheader,
        EN:req.body.enheader
    }
    let category=req.body.category
    let shablon=req.body.shablon 
    let banner=req.body.banner
    let bosh=req.body.bosh
    if(bosh[0]!=undefined){
      console.log("shu ishledi bosh")
      if(shablon!=1){
          for(let i=0;i<bosh.length;i++){
            fs.unlink("./public/constructor/"+id+"/"+files.pic[(bosh[i]-i)],(err)=>{if(err){console.log(err)}})
            allfiles.splice((bosh[i]-i),1," ")
        }
      }else{
        for(let i=0;i<bosh.length;i++){
          let hasap=(bosh[i]*2)-1
          allfiles.splice(hasap,1," ")
          allfiles.splice(hasap+1,1," ")
        }
      }
    }
    try {
        await Constructor.update({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon,pic:allfiles},{where:{id:id}})
        return res.status(200).send({id:Number(constructorId)},)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.deleteSubcategory =async(req,res,next)=>{
    let id=req.query.id
    try {
        await Constructor.destroy({where:{id:id}})
        rimraf("./public/constructor/"+id,(err)=>{if(err){console.log(err)}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({status:"bolmady"})
    }
}
exports.addPic=async(req,res,next)=>{
    let id=req.query.id
    let filename
    let allfiles=[]
    let newfiles=[]

    try {
        filename=await Constructor.findOne({where:{id:id}})
        if(filename.pic!=null){
        allfiles=filename.pic
        }
    }catch (err) {
        console.log(err)
        return res.status(400).json({err:"something went wrong"})
    }
    let sana=0

    let pic=Object.values(req.files)
    let pic1=req.files
    for(let i=0; i<pic.length; i++) {
    let a=await sharp(pic[i].data).resize(1024,728).toBuffer()
    let filename=randomstring.generate(7)+".jpg"
    await sharp(a).toFile("./public/constructor/"+id+"/"+filename)
    newfiles.push(filename)
    }   
    let uzynlyk=newfiles.length+allfiles.length
    for (let j=0; j<=uzynlyk; j++){
      let x="pic"+j
      if(pic1[x]!=undefined && allfiles[j]!=undefined){
        fs.unlink("./public/constructor/"+id+"/"+allfiles[j],(err)=>{if(err){console.log(122,err)}})
        allfiles.splice(j,1,newfiles[sana]);
        sana+=1
      }else if(pic1[x]!=undefined &&allfiles[j]==undefined){console.log(155,"shu ishledi");allfiles.push(newfiles[sana]);sana+=1}
      else if(pic1[x]!=undefined &&allfiles[j]==" "){
        for (let k=j;k>0;k--){if(allfiles[k]!=" "){allfiles.splice(k,1,newfiles[sana]);sana+=1;break}}
      }
}
    try {
        await Constructor.update({pic:allfiles},{where:{id:id}})
        return res.status(200).json({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).json({status:"Something went wrong"})
    }
}
exports.addVideo=async(req,res,next)=>{
    let id=req.query.id
    let filename
    let allfiles=[]
    let newfiles=[]
    try {
        filename=await Constructor.findOne({where:{id:id}})
        if(filename.pic!=null){
        allfiles=filename.pic
        }
    }catch (err) {
        console.log(err)
        return res.status(400).json({err:"something went wrong"})
    }
    let sana=0

    let pic=Object.values(req.files)
    let pic1=req.files
    for(let i=0; i<pic.length; i++) {
        let filename=randomstring.generate(7)+".mp4"    
        pic[i].mv("./public/constructor/"+id+"/"+filename)
        newfiles.push(filename)}   
    let uzynlyk
    console.log(allfiles.length,newfiles.length)
    if(allfiles.length==0 || allfiles.length==undefined){uzynlyk=1}else{uzynlyk=allfiles.length}
    if(allfiles.length!=0 &&allfiles.length<newfiles.length){console.log(156);uzynlyk=pic.length}
    console.log(uzynlyk)
    console.log(allfiles,newfiles)
    for (let j=0; j<=uzynlyk; j++){
      let x="pic"+j
      if(pic1[x]!=undefined && allfiles[j]!=undefined){
        fs.unlink("./public/constructor/"+id+"/"+allfiles[j],(err)=>{if(err){console.log(122,err)}})
        allfiles.splice(j,1,newfiles[sana]);
        sana+=1
      }else if(pic1[x]!=undefined &&allfiles[j]==undefined){console.log(155,"shu ishledi");allfiles.push(newfiles[sana]);sana+=1}
      else if(pic1[x]!=undefined &&allfiles[j]==" "){
        for (let k=j;k>0;k--){if(allfiles[k]!=" "){allfiles.splice(k,1,newfiles[sana]);sana+=1;break}}
      }
}
    try {
        await Constructor.update({pic:allfiles},{where:{id:id}})
        return res.status(200).json({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).json({status:"Something went wrong"})
    }
}
exports.addFile=async(req,res,next)=>{
    let id=req.query.id
    let allfiles=[]
    try {
      let constructor=await Constructor.findOne({where:{id:id}})
      if(constructor.files!=undefined){
        allfiles=constructor.files
      }
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"something went wrong"})
    }
    let pic=Object.values(req.files)
    for(let i=0;i<pic.length;i++){
          filename=pic[i].name
          await pic[i].mv(`./public/constructor/${id}/`+filename,(err)=>{if(err){console.log(err)}})
          let obj={
              filename:filename,
              size:size(pic[i].size)
          }
          allfiles.push(obj)
      }
    try {
      await Constructor.update({files:allfiles},{where:{id:id}})
      return res.status(200).json({status:200})
    }catch (err) {
      console.log(err)
      return res.status(400).json({err:"something went wrong"})
    }
}
exports.deleteFile=async(req,res,next)=>{
    let id=req.query.id
    let index = req.query.index
    let allFiles=[]
    try {
        let file=await Constructor.findOne({where: {id:id}})
        allFiles=file.files
        let filename=allFiles.splice(index,1)
        fs.unlink("./public/constructor/"+id+"/"+filename[0].filename,(err)=>{if(err){console.log(err)}})
        await Constructor.update({files:allFiles},{where:{"id":id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.search=async(req,res,next)=>{
    let text=req.query.text
    let search
    let id=req.query.id
    try {
        search=await Constructorcategory.findOne({where:{id:searchId},include:["constructors"]});
    }catch (error) {
        console.log(error)
        return res.status(400).send("something went wrong")
  }
  let result=searchFromConstructor(search.constructors,text)
  return res.send(result)
}
exports.addTestPic=async(req,res,next)=>{
    let id=req.query.id
    let dbPics=[]
    try {
        let picture = await Constructor.findOne({where:{id:id}})
        if(picture.pic!=null){

            dbPics=dbPics.pic
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
    let allpics=req.files
    let picArray=Object.values(allpics)
    let uzynlyk=picArray.length+dbPics.length
    for (let i=0;i<uzynlyk;i++){
        console.log(dbPics[i])
        let x="pic"+i
        if(allpics[x]!=undefined && dbPics[i]!=undefined){
            console.log(316)
            let oneCollection=Object.values(picArray[i])
            let miniArray=[]
            for (let j=0;j<oneCollection.length;j++){
                let buffer=await sharp(oneCollection[j].data).resize(1100,234).toBuffer()
                let filename=oneCollection[j].name.split(".")[0]+".jpg"
                await sharp(buffer).toFile(`./public/constructor/${id}/${filename}`)
                miniArray.push(filename)
            }
            dbPics[i].push(miniArray)
        }else if(allpics[x]!=undefined && dbPics[i]==undefined) {
            console.log(327)
            let oneCollection=Object.values(picArray[i])
            let miniArray=[]
            for (let j=0;j<oneCollection.length;j++){
                let oneFile=oneCollection[j]
                let buffer=await sharp(oneFile.data).webp().resize(1100,234).toBuffer()
                let filename=oneFile.name.split(".")[0]+".webp"
                await sharp(buffer).toFile(`./public/constructor/${id}/${filename}`)
                miniArray.push(filename)
            }
            dbPics.push(miniArray)
        }
    }
    console.log(341,dbPics)
    // try {
    //     await Constructor.update({pic:dbPics},{where:{id}})
    //     return res.status(200).send({status:200})
    // } catch (err) {
    //     console.log(err)
    //     return res.status(400).send("something went wrong")
    // }
    
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
    return size+status
}
function sort(array){
    let obj={}
    sortedArray=[]
    let max=0
    let one
    let uzynlyk=array.length
    let status=true
    let index
    while(uzynlyk>0){
        console.log(uzynlyk)
        for(let i=0; i<array.length; i++){
            if(array[i].id>max){
                max=array[i].id
                one=array[i]
                index=i
            }
        }
        array.splice(index,1)
        uzynlyk=array.length
        max=0
        sortedArray.push(one)
    }
    obj.constructors=sortedArray
    return obj
}
