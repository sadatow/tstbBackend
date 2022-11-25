const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const{Menu}=require("./models")
const schedule = require('node-schedule');
const app=express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(fileupload())
const cors=require("cors")
app.use(cors({
    origin:"*",
    credentials:true,
}))
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
        await Menu.update({body:statistika.body},{where: {id:4}})
      console.log('ayy pozya');
    });
    const week = schedule.scheduleJob('0 0 0 * * 1',async function(){
        let statistika=await Menu.findOne({where: {id:4}})
        console.log(statistika.body)
        statistika.body.week=0
        await Menu.update({body:statistika.body},{where: {id:4}})
        console.log('hepdani pozya');
      });
app.use(express.static("./public"))
app.use(require("morgan")("dev"))
app.use("/",require("./routes/main"))
app.use("/news",require("./routes/news"))//dyndyk
app.use("/newspapers",require("./routes/newspaper"))//dyndyk
app.use("/banners",require("./routes/banner"))//dyndyk
app.use("/members",require("./routes/members"))//dyndyk
app.use("/province",require("./routes/province"))//dyndyk
app.use("/sponsor",require("./routes/sponsor"))
app.use("/events",require("./routes/events"))//dyndyk
app.use("/industry",require("./routes/industry"))
app.use("/commerce",require("./routes/commerce"))//dyndyk
app.use("/constructor",require("./routes/constructor"))
app.use("/mail",require("./routes/mail"))//dyndyk
app.use("/chat",require("./routes/chat"))
app.use("/menu",require("./routes/menu"))//dyndyk
app.use("/login",require("./routes/login"))
app.listen("5000",async function(){
    await sequelize.authenticate()
    console.log("app is listening on 5000")

})


