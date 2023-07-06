const sharp=require("sharp")
const randomstring = require("randomstring")
const fs = require("fs")
const ip=require("ip")
exports.decodeBase64=async(text,path)=>{
    let startIndex
    let endIndex
    let replaceStart
    let status=true
    let brandNew=text
    while(status){
      status=false
      if(text.includes("<img src=\"data:image")){
        console.log(14)
        startIndex=text.indexOf("\"data:image")
        replaceStart=startIndex
        for(let i=startIndex; i<text.length; i++){
          if (text[i]==","){  
            startIndex=i
            break
          }
        }
        for (let i=startIndex; i<text.length; i++){
          if(text[i]==">"){
            endIndex=i
            break
          }
        }
      }
      if(replaceStart!=undefined){
        let b64string = text.substring(startIndex+1,endIndex-1)
        let replace=text.substring(replaceStart,endIndex)
        let filename=randomstring.generate(7)+".jpg"
        let newVar="https://tstb.gov.tm:5003/"+path+filename
        brandNew=text.replace(replace,newVar)
        let buffer=Buffer.from(b64string,"base64")
        console.log(filename,brandNew)
        fs.writeFile("./public/"+path+filename,buffer,(err)=>{if(err){console.log(err)}})
        console.log(brandNew)
      }
    }
      return brandNew
}  
 exports.decodeBase64Array=async(text,path,res)=>{
  let startIndex
  let array=[]
  let endIndex
  let replaceStart
  let status=true
  let brandNew=text
  while(status){
    status=false
    if(text.includes("<img src=\"data:image")){
      startIndex=text.indexOf("\"data:image")
      replaceStart=startIndex
      for(let i=startIndex; i<text.length; i++){
        
        if (text[i]==","){

          startIndex=i
          break
        }
      }
      console.log(17,startIndex)
      for (let i=startIndex; i<text.length; i++){
        if(text[i]==">"){
          endIndex=i
          break
        }
      }
    }
    if(replaceStart!=undefined){
      let b64string = text.substring(startIndex+1,endIndex-1)
      let replace=text.substring(replaceStart,endIndex)
      let filename=randomstring.generate(7)+".jpg"
      let newVar="https://tstb.gov.tm:5003/"+path+filename
      console.log(newVar)
      brandNew=text.replace(replace,newVar)
      let buffer=Buffer.from(b64string,"base64")
      await sharp(buffer).toFile("./public/"+path+filename)
      console.log(brandNew)
      }
      }
      array.push(brandNew)
    return array
}  
exports.decodeBase64Constructor=async(text,path)=>{
  let startIndex
  let array=[]
  let endIndex
  let replaceStart
  let status=true
  let brandNew=text
  text.forEach(e=>{
    status=true
    while(status){
      status=false
      if(e.includes("<img src=\"data:image")){
        startIndex=e.indexOf("\"data:image")
        replaceStart=startIndex
        for(let i=startIndex; i<e.length; i++){
          
          if (e[i]==","){
  
            startIndex=i
            break
          }
        }
        console.log(17,startIndex)
        for (let i=startIndex; i<e.length; i++){
          if(e[i]==">"){
            endIndex=i
            break
          }
        }
      }
      if(replaceStart!=undefined){
        let b64string = e.substring(startIndex+1,endIndex-1)
        let replace=e.substring(replaceStart,endIndex)
        let filename=randomstring.generate(7)+".jpg"
        let newVar="https://tstb.gov.tm:5003/"+path+filename
        console.log(newVar)
        brandNew=e.replace(replace,newVar)
        let buffer=Buffer.from(b64string,"base64")
        fs.writeFile("./public/"+path+filename,buffer,(err)=>{if(err){console.log(err)}})
        console.log(brandNew)
        }
        }
        array.push(brandNew)
  })
    return array
}
