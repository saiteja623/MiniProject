const mongoose=require("mongoose");


//create the schema
const userSchema=new mongoose.Schema({
    mail:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})


const User = new mongoose.model("User",userSchema);
module.exports=User;

