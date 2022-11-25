const express=require("express");
const router=express.Router()
const {Chat}=require("../models")
const {Op}=require("sequelize")
const io=require("socket.io")("3000",{cors:{origin:"*"}})
let users = {}
let adminOnline = false
let adminSocket
let isNewMessage=false
router.get("/getOne",async(req,res)=>{
    let id=req.query.id
    try {
        let chat=await Chat.findOne({where:{id}})

        await Chat.update({isRead:"true"},{where:{id}})
        return res.send(chat)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
})
router.get("/getAll",async(req,res)=>{
    try {
        let chat = await Chat.findAll({order:[["updatedAt","DESC"]]},{where:{
            chat:{[Op.not]:null}}})
        return res.send(chat)
    } catch (err) {
        (err)
        return res.status(400).send("something went wrong")
    }
})
io.on('connection',async(socket) => {
    socket.on('new-user', async(name) => {
        console.log("new users")
        await Chat.create({user:socket.id})
        users[socket.id]=socket.id
        socket.emit("new-user-login",{id:socket.id})
    })
    socket.on("login",async(socketId)=>{
        console.log("login")
        users[socket.id]=socket.id
        console.log(socketId)
        let messages=await Chat.findOne({where:{user:socketId}})
        await Chat.update({lastId:socket.id},{where:{user:socketId}})
        socket.emit("all-messages",messages.chat)
    })
    socket.on("admin-login",async()=>{
        adminOnline=true
        adminSocket=socket.id
        console.log(isNewMessage)
        if(isNewMessage){
            socket.emit("new-messages")
            isNewMessage=false
        }
    })
    socket.on("admin-send",async(message)=>{``
        let user=message.user
        let lastMessage=message.text
        let id
        let messages=await Chat.findOne({where:{id:user}})
        if(users[messages.lastId]!=undefined){
            console.log(68)
            socket.broadcast.to(messages.lastId).emit('admin-message', {lastMessage})
        }
        let allMessages=messages.chat
        let newMessage={
            who:"admin",
            message:lastMessage
        }
        allMessages.push(newMessage)
        await Chat.update({chat:allMessages},{where:{id:user}})
        console.log("admin has send message")
        socket.emit("admin-success",{})
    })
    socket.on('send-chat-message', async(obj) => {
        let allMessages =[]
        console.log(obj.id)
        let messages=await Chat.findOne({where:{user:obj.id}})
        obj.id=messages.id
        console.log(83,obj)
        if(messages.chat!=null){
            allMessages=messages.chat
        }
        let newMessage={
            who:"you",
            message:obj.message}
        allMessages.push(newMessage)
        if(adminOnline){
            socket.broadcast.to(adminSocket).emit('chat-message', {message: obj})
            isNewMessage=false
        }
        await Chat.update({chat:allMessages,lastId:socket.id,isRead:"false"},{where:{id:obj.id}})


    })
    socket.on('disconnect', () => {
        console.log("chykdy")
    if(adminSocket==socket.id){
        console.log("admin chykdy")
        adminOnline = false
    }
    delete users[socket.id]
  })
})
module.exports=router
