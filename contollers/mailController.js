const {Mail}=require("../models")

exports.addUser=async(req,res,next)=>{
    console.log(req.body)
    let mail=req.body.name
    try {
        await Mail.create({email:mail})
        return res.send({status:200})
    } catch (err) {
        console.log(err)
        return res.send("something went wrong")
    }
}
exports.getUsers=async(req,res,next)=>{
    try {
        let users=await Mail.findAll({order:[["id","DESC"]]})

        return res.send(users)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")        
    }
}
exports.deleteUser=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Mail.destroy({where:{id:id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"something went wrong"})
    }
}
