const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    email:String,
    phone:String,
    password:String,
    confirm_password:String
})
let reg_user=mongoose.model("user",userSchema)
module.exports = reg_user;