const express=require("express");
const app=express();
const cors=require("cors");
const User=require("./models/userModel");
require("dotenv").config();
const nodemailer=require("nodemailer");
const puppeteer= require("puppeteer")


const pass=process.env.PASSWORD
//used to connect database
require("./conn");


//cross origin resource policy
app.use(cors({
    origin:["null","*","https://www.amazon.in"],
    credentials:true
}))

//to get the data from req.body 
app.use(express.json())


async function startTracking(email,url,price)
{
    // const result=await User.find();
    // for(var i=0;i<result.length;i++){
        const browser=await puppeteer.launch({defaultViewport:null,slowMo:50,headless:false});
        const page=await browser.newPage();
        await page.goto("https://amazon.in",{waitUntil:'domcontentloaded'});
        await page.goto(url,{waitUntil:'domcontentloaded'});
        await page.waitForTimeout(10000);
        let currPrice=await page.evaluate(async ()=>{
            let x=await document.getElementById("priceblock_dealprice");
            if(x==null)
                x=document.getElementById("priceblock_ourprice");
            return x.innerText;

        })
        var p = Number(currPrice.replace(/[^0-9.-]+/g,""));
        console.log("price is",p);
        if(p<=price){
            // await User.deleteOne(result[i]);
            sendMail(email,url,price,p);
            //also remove the record from the database
        }
        await browser.close();
    // }
}

//this function should be invoked if the product price meets the desired price
function sendMail(userEmail,url,usersPrice,currPrice)
{
    console.log("in mail");
    let transporter= nodemailer.createTransport({
        service:'gmail',
         auth:{
             user:'teamdjango.online@gmail.com',
             pass:pass
         }
     });
     
     let mailOptions={
         from:'teamdjango.online@gmail.com',
         to:userEmail,
         subject:'amazon price tracker',
         text:'Hello world',
         html:`<h4>Your price has been dropped!</h4><br/><p>You wished to track the product and now the price of the product is ${currPrice} which falls below your desired Price ${usersPrice}.Yay! You can now buy the product</p><br/>
        <br/><p><a href=${url}>click here</a> to visit the product.</p>`
     }
     transporter.sendMail(mailOptions,(error,info)=>{
         if(error)
         {
             console.log("error occured",error);
         }
         else{
             console.log("mail sent successfully");
         }
     })
}


app.post('/sendmail',(req,res)=>{
    const {email,url,price}=req.body;
    console.log("request recieved");
    store(email,url,price); 
    startTracking(email,url,price);  
    res.status(200).send();
    
})

async  function store(mail,url,price)
{
    
    const user=new User({
        mail:mail,
        url:url,
        price:price

    })
    await user.save();
}



// sendMail("saiteja.balla13@gmail.com","https://amazon.in","18000","15000");

//app recieves the http requests at port 5000
app.listen("5000",()=> console.log("listening on port 5000"));