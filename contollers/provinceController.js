const {Province}=require("../models")

exports.addSettings=async(req,res,next)=>{
    try{
        await Province.create({place:{
            ashgabat:{
                tmAddress:"",
                ruAddress:"",
                enAddress:"",
                faks:"",
                email:"",
                phone:""
            },
            ahal:{
                tmAddress:"",
                ruAddress:"",
                enAddress:"",
                faks:"",
                email:"",
                phone:""
            },
            balkan:{
                tmAddress:"",
                ruAddress:"",
                enAddress:"",
                faks:"",
                email:"",
                phone:""
            },
            mary:{
                tmAddress:"",
                ruAddress:"",
                enAddress:"",
                faks:"",
                email:"",
                phone:""
            },
            dashoguz:{
                tmAddress:"",
                ruAddress:"",
                enAddress:"",
                faks:"",
                email:"",
                phone:""
            },
            lebap:{
                tmAddress:"",
                ruAddress:"",
                enAddress:"",
                faks:"",
                email:"",
                phone:""
            }
        }})
        return res.send("sucess")
    }catch(err){
        console.log(err)
        return res.send("somthing went wrong")
    }
}
exports.getProvince=async(req,res,next)=>{
    try {
        let province=await Province.findOne({where:{id:1}})
        return res.send(province.place)
    } catch (err) {
        console.log(err)
        return res.send(400).send("something went wrong")
    }
}
exports.editProvince=async(req,res,next)=>{
    let place={}
    let little={}
    little={
        tmAddress:req.body.ashgabat.tmAddress,
        ruAddress:req.body.ashgabat.ruAddress,
        enAddress:req.body.ashgabat.enAddress,
        faks:req.body.ashgabat.faks,
        email:req.body.ashgabat.email,
        phone:req.body.ashgabat.phone
    }
    place.ashgabat=little
    little={
        tmAddress:req.body.ahal.tmAddress,
        ruAddress:req.body.ahal.ruAddress,
        enAddress:req.body.ahal.enAddress,
        faks:req.body.ahal.faks,
        email:req.body.ahal.email,
        phone:req.body.ahal.phone
    }
    little={
        tmAddress:req.body.mary.tmAddress,
        ruAddress:req.body.mary.ruAddress,
        enAddress:req.body.mary.enAddress,
        faks:req.body.mary.faks,
        email:req.body.mary.email,
        phone:req.body.mary.phone
    }
    place.mary=little
    little={
        tmAddress:req.body.balkan.tmAddress,
        ruAddress:req.body.balkan.ruAddress,
        enAddress:req.body.balkan.enAddress,
        faks:req.body.balkan.faks,
        email:req.body.balkan.email,
        phone:req.body.balkan.phone
    }
    place.balkan=little
    little={
        tmAddress:req.body.dashoguz.tmAddress,
        ruAddress:req.body.dashoguz.ruAddress,
        enAddress:req.body.dashoguz.enAddress,
        faks:req.body.dashoguz.faks,
        email:req.body.dashoguz.email,
        phone:req.body.dashoguz.phone
    }
    place.dashoguz=little
    little={
        tmAddress:req.body.lebap.tmAddress,
        ruAddress:req.body.lebap.ruAddress,
        enAddress:req.body.lebap.enAddress,
        faks:req.body.lebap.faks,
        email:req.body.lebap.email,
        phone:req.body.lebap.phone
    }
    place.lebap=little
    little={
        tmAddress:req.body.ahal.tmAddress,
        ruAddress:req.body.ahal.ruAddress,
        enAddress:req.body.ahal.enAddress,
        faks:req.body.ahal.faks,
        email:req.body.ahal.email,
        phone:req.body.ahal.phone
    }
    place.ahal=little


    try{
        let province=await Province.update({place:place},{where:{id:1}})
        return res.send({status:200})
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
