const{Menu}=require("../models")
const schedule = require('node-schedule');
exports.dayControl=async()=>{``
    const job = schedule.scheduleJob('* 5 * * * *',async ()=>{
        let statistika=await Menu.findOne({where: {id:4}})
        console.log(statistika.body)
        // statistika.body.day
        console.log('gunligi pozya');
    });
    const job1 = schedule.scheduleJob('0 0 0 1 * *', function(){
      console.log('ayy pozya');
    });
    const job2 = schedule.scheduleJob('0 0 0 * * 1', function(){
        console.log('hepdani pozya');
      });
}