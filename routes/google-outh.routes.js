const express=require("express")
const passport=require("../config/google-oauth")
require("dotenv").config
const googleOathRouter=express.Router()
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/User.model")

const user_type=""

googleOathRouter.get("/google",
passport.authenticate('google', { scope: ['profile','email'] })
)



googleOathRouter.get("/google/callback",
passport.authenticate('google', { failureRedirect: '/login',session:false }),
async function(req, res) {
      const {name,email,password}= req.user
      const new_user=new UserModel({
        user_name:name,
        email:email,
        password:password,
        verified:false
    })
    try{
        const user= await UserModel.findOne({email})
        
        if(user){
            let user_detail={
                email,
                user_type:"user"
            }
            const token=jwt.sign({user_detail},process.env.SECRET_KEY);
            res.cookie(`tokyo`,token)
            res.redirect('/');
        }
        else{
            await await new_user.save()
            let user_detail={
                email,
                user_type:"user"
            }
            const token=jwt.sign({user_detail},process.env.SECRET_KEY);
               res.cookie(`tokyo`,token)
            res.redirect('/');
        }
     
    }
    catch(err){
      console.log(err)
      res.redirect('/');
    }

  
}

)

module.exports={googleOathRouter}