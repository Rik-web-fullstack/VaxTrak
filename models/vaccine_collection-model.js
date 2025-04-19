const mongoose=require('mongoose')

const vaccineSchema = new mongoose.Schema({
    name: String,
    minAge: Number,
    maxAge: Number
});

let dev_vaccine=mongoose.model("vac",vaccineSchema)
module.exports = dev_vaccine;