const {Login}=require("../models")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const randomstring=require("randomstring")
const nodemailer = require('nodemailer');
const {Op}=require("sequelize")
exports.getMe=async(req,res,next)=>{
    return res.send(req.admin)
}
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
    console.log(22)
    return jwt.sign({ id }, 'rustam', {
        expiresIn: '5m',
    });
};
const refreshToken = (ref) => {
    return jwt.sign({ ref }, 'rustam', {
        expiresIn:"30d"
    });
};

const createSendToken = async(admin, statusCode, res) => {
    const token = signToken(admin.id);
    const refresh=randomstring.generate(
        {
            charset:"alphabetic",
            length:4
        }
    )
    console.log(38,token)
    await admin.update({refresh})
    const rToken = refreshToken(refresh)
    console.log({token,rToken})
    res.status(statusCode).json({
        token,
        refreshToken:rToken,
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
        return res.status(401).send({status:"You are not admin"})
    }
    console.log(token)
    try {
        var decoded = jwt.verify(token, "rustam");
        } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).send({status:"expired"})
        } else {
            return res.status(400).send({status:"Invalid token"})
        }
    }
    const freshAdmin = await Login.findOne({ where: { id: decoded.id } });

    if (!freshAdmin) {
        return res.status(403).send({status:"Not Admin"})
    }
    req.admin = freshAdmin;
    req.admin.refresh=undefined
    req.admin.password=undefined
    next();
};
exports.refresh = async(req, res, next) => {
    const freshAdmin = await Login.findOne();
    let token;
    if (
        req.headers.refresh &&
        req.headers.refresh.startsWith('Bearer')
    ) {
        token = req.headers.refresh.split(' ')[1];
    }
    if (!token) {
        return res.status(400).send({status:"Please provide a  token"});
    }
    try {
        var decoded = jwt.verify(token, "rustam");
        } catch (error) {
            return res.status(401).send({status:"Invalid token"})
        }
    if(decoded.ref==freshAdmin.refresh)
        await createSendToken(freshAdmin,200,res)
    else {
        return res.status(400).send("Login please")
    } 
};
exports.login=async(req,res,next)=>{
    let name=req.body.name
    let password=req.body.pass
    try {
        let admin=await Login.findOne()
        const result=await bcrypt.compare(password,admin.password)
        console.log(result)
        if(admin.name==name && result){
            await sendMail(admin)
            return res.status(200).send({status:"Success"})
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
    let mail=req.body.mail
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
exports.editMail=async(req, res,next)=>{
    let mail=req.body.mail
    console.log(req.body)
    let login=await Login.findOne()
    try {
        login=await Login.update({mail},{where:{id:{[Op.not]:null}}})
        return res.send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({status:400})
    }
}
exports.otp=async(req, res, next)=>{
    const otp=req.body.otp
    const admin=await Login.findOne()
    if(otp==admin.otp){
        await admin.update({otp:null})
        createSendToken(admin,200,res)
    }else{
        return res.status(400).send({status:400})
    }
}
async function sendMail(admin)  {
    const x=randomstring.generate({
        charset:"123456789",
        length:4
    })
    console.log(x)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'mailsenderofgeekspace@gmail.com',
            pass: 'gkvnwexxzvfpuidf',
        },
    });
    const mailOptions = {
        from: 'mailsenderofgeekspace@gmail.com',
        to: admin.mail,
        subject: 'OTP password',
        text: x.toString(),
    };
    await admin.update({otp:x.toString()})
    console.log("update etdim")
    await transporter.sendMail(mailOptions);
};
