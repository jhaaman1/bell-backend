const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    username:{type:String,required:true},
    gender:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirm_password:{type:String,required:true},
    phone_number:{type:Number,required:true},
    organisation: {type:String, required: true}
})

const UserModel=mongoose.model("user",userSchema)


module.exports={UserModel}