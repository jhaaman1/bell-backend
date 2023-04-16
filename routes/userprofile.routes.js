const express=require("express")
const { UserModel } = require("../models/User.model")
const userProfile=express.Router()


userProfile.get("/user/:id",async(req,res)=>{
    const {id}=req.params
    const profile=await UserModel.findOne({_id:id})
    res.send({"profile":profile})
})


module.exports={userProfile}