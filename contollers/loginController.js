const {Login}=require("../models")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.setting=async(req,res,next)=>{
    try {
        let password
        let login=await Login.findOne()
        if(login!=null){
            return res.send("setting edildi")
        }else{
            password=bcrypt.hashSync("tstbadmin",10)
            login=await Login.create({"name":"admin","password":password})
            return res.send(login)
        }
    } catch (err) {
        console.log(err)
        return res.send("error")
    }
}
const signToken = (id) => {
    return jwt.sign({ id }, 'rustam', {
        expiresIn: '24h',
    });
};
const createSendToken = (admin, statusCode, res) => {
    const token = signToken(admin.id);
    res.status(statusCode).json({
        token,
        data: {
            admin,
        },
    });
};
exports.protect = async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged as an Admin!.', 401));
    }

    const decoded = await jwt.verify(token, 'rustam');
    const freshAdmin = await Login.findOne({ where: { id: decoded.id } });

    if (!freshAdmin) {
        return next(
            new AppError('The user belonging to this token is no longer exists', 401)
        );
    }
    req.admin = freshAdmin;
    next();
};
exports.login=async(req,res,next)=>{
    let name=req.body.name
    let password=req.body.pass
    try {
        let admin=await Login.findOne()
        if(admin.name==name){

            bcrypt.compare(password,admin.password,function(err,result){
                if(result==true){
                    console.log("result true")
                    createSendToken(admin, 200, res);
                }else{
                    return res.status(400).send({status:401})
                }
            })
        }else{
            return res.status(400).send({status:400})}
    } catch (err) {
        console.log(err)
        return res.status(400).send("error")
    }
}
exports.update=async(req, res,next)=>{
    let password=req.body.password
    let name=req.body.name
    let login=await Login.findOne()
    try {
        password=bcrypt.hashSync(password,10)
        console.log(password)
        login=await Login.update({"name":name,"password":password},{where:{id:1}})
        return res.send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({status:400})
    }
    }
