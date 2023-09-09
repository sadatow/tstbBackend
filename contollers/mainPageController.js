const {Banners,News,Member,Province,Sponsor,Events,Industry,Constructorcategory,Menu}=require("../models")
const {Op}=require("sequelize")
exports.getAll=async(req,res,next)=>{
  let obj={}
      try{
        let news=await News.findAll({
          order:[
            ["id","DESC"]
          ],
          attributes:["name","pic","date","id","header","body"],
          limit:4,
          where:{active:"true"}
        })
        obj.list=news
      }catch(err){
        console.log("news",err)
        return res.status(500).send({err:"err"})
      }
      try{
        let news=await Events.findAll({
          order:[
            ["id","DESC"]
          ],
          attributes:["name","body","pic","date","id","header"],
          limit:4,
          where:{active:"true"}
        })
        obj.list2=news
      }catch(err){
        console.log("event",err)
        return res.status(500).send({err:"err"})
      }
      try{
          let banners=await Banners.findAll({
              order:[
                  ["id","ASC"]
              ],
              attributes:["banner","id"]
          })
          obj.banner=banners
      }catch(err){
          console.log("banners",err)
          return res.status(500).json({"err":"something went wrong"})
      }
      try {
        let banners=await Industry.findAll({
          order:[
              ["id","DESC"]
          ],
          where:{sub:{[Op.not]: null}},
          attributes:["id","name"]
      })
      obj.karhanalar=banners
        
      } catch (err) {
        console.log("karhana",err)
        return res.status(500).json({"err":"something went wrong"})
      }
      try{
        let members=await Member.findAll({
            order:[
                ['id',"DESC"]
            ],
            attributes:["id","pic","name"]
          })
          obj.brands=members;
    }catch(err){
      console.log("members",err)
      return res.json({"err":"something went wrong"})
  }
  try{
    let sponsor=await Sponsor.findAll({
        where:{"active":"true"}
      })
      obj.sponserler=sponsor
}catch(err){
    console.log("sponsor",err)
    return res.status(500).send("something went wrong")
}
try {
  let category=await Constructorcategory.findAll({order:[["id","DESC"]]})
  obj.category=category
} catch (err) {
  console.log("constructor",err)
  return res.status(400).send("something went wrong")
}
try{
  let province=await Province.findOne({
    attributes:["id","place"],where:{id:1}}
  )
  obj.location=province
}catch(err){
  console.log("loction",err)
  return res.status(500).send("something went wrong")
}
try {
  let statistika=await Menu.findOne({where: {id:4}})
  let array=[]
  array.push(statistika.body.bussinessman)
  array.push(statistika.body.projects)
  array.push(statistika.body.yearswithyou)
  array.push(statistika.body.school)
  array.push(statistika.body.today)
  array.push(statistika.body.week)
  array.push(statistika.body.month)
  obj.statictika=array
} catch (err) {
  console.log("stats",err)  
}
  return res.send(obj)
}
