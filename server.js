const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const rateLimit = require('express-rate-limit')
const{Menu}=require("./models")
const helmet=require("helmet")
const schedule = require('node-schedule');
const frameguard=require("frameguard")
const app=express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(fileupload())
// app.use(
//     helmet({
//       crossOriginEmbedderPolicy: false,
//       // ...
//     })
//   );
// app.use(frameguard({action:"SAMEORIGIN"}))
const cors=require("cors")
app.use(cors({
    origin:"*",
    credentials:true,
}))
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false, 
})

app.use(limiter)
app.disable("x-powered-by")
    const week = schedule.scheduleJob('0 1 0 * * 1',async function(){
      let statistika=await Menu.findOne({where: {id:4}})
      console.log(statistika.body)
      statistika.body.week=0
      statistika.body.day=0
      await Menu.update({body:statistika.body},{where: {id:4}})
      console.log('hepdani pozya');
    });
    const day = schedule.scheduleJob('0 0 0 * * *',async ()=>{
        let statistika=await Menu.findOne({where: {id:4}})
        console.log(statistika.body)
        statistika.body.today=0
        console.log(statistika.body)
        await Menu.update({body:statistika.body},{where: {id:4}})
        console.log('gunligi pozya');
    });
    const month = schedule.scheduleJob('0 0 0 1 * *',async function(){
        let statistika=await Menu.findOne({where: {id:4}})
        console.log(statistika.body)
        statistika.body.month=0
        statistika.body.day=0
        await Menu.update({body:statistika.body},{where: {id:4}})
      console.log('ayy pozya');
    });
    
    app.use(express.static("./public"))
    app.use(require("morgan")("dev"))
    app.use("/api",require("./routes/main"))
    app.use("/api/news",require("./routes/news"))//dyndyk
    app.use("/api/newspapers",require("./routes/newspaper"))//dyndyk
    app.use("/api/banners",require("./routes/banner"))//dyndyk
    app.use("/api/members",require("./routes/members"))//dyndyk
    app.use("/api/province",require("./routes/province"))//dyndyk
    app.use("/api/sponsor",require("./routes/sponsor"))
    app.use("/api/events",require("./routes/events"))//dyndyk
    app.use("/api/industry",require("./routes/industry"))
    app.use("/api/commerce",require("./routes/commerce"))//dyndyk
    app.use("/api/constructor",require("./routes/constructor"))
    app.use("/api/mail",require("./routes/mail"))//dyndyk
    app.use("/api/chat",require("./routes/chat"))
    app.use("/api/menu",require("./routes/menu"))//dyndyk
    app.use("/api/login",require("./routes/login"))
    app.get("/api/images/:path/:image",(req,res)=>{
      console.log("men barder")
      res.sendFile(req.params.image,{root:"./public/"+req.params.path})
    })
    app.listen(5000,async()=>{
  await sequelize.authenticate()
  console.log("Connected to DB and listening on port 5000")
})


