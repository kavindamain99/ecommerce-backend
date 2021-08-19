const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        require: true,
        maxLength:32,
        unique:true
    }


},{timestamps:true});

module.exports = mongoose.model("Category",categorySchema);