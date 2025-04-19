const mongoose=require('mongoose')

const memberSchema=new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:String,
    age:String,
    gender:String,
    building:String,
    street:String,
    city:String,
    state:String,
    pincode:String,
    vaccines_taken:[String]
})
let add_member=mongoose.model("member",memberSchema)
module.exports = add_member;