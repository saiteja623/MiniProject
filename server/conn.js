const mongoose=require("mongoose");
const User=require("./models/userModel");
const DB="mongodb+srv://saiteja:saishiva0413@cluster0.9okda.mongodb.net/mernstack?retryWrites=true&w=majority";
const node=require("node-cron");
const nodemailer=require("nodemailer");
const puppeteer= require("puppeteer")

const pass=process.env.PASSWORD

//connect database
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(res=>{
    console.log("connection successful")
    // track();

}).catch(err=>console.log(err))

function track()
{
    node.schedule('*/1 * * * *',function() {
        startTracking();
    })
}
