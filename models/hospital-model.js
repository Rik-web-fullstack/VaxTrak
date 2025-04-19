const mongoose=require('mongoose')

const hospitalSchema=new mongoose.Schema({

    hos_name:String,
    hos_email:String,
    hos_phone:String,
    hos_category:String,
    Vaccine_available:[String],
    address_1:String,
    street:String,
    city:String,
    state:String,
    pincode:String
})
let add_hospital=mongoose.model("hospitals",hospitalSchema)
module.exports = add_hospital;