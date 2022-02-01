const mongoose=require("mongoose");
const User=require("./models/userModel");
const node=require("node-cron");
const nodemailer=require("nodemailer");
const puppeteer= require("puppeteer")
require("dotenv").config();
const pass=process.env.PASSWORD

const DB=process.env.URL;


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
