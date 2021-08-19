const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        
        maxLength:20

    },

    lastName:{
        type:String,
        trim:true,
        
        maxLength:20

    },

    email:{
        type:String,
        trim:true,
        
        unique:true

    },

    
    password:{
        type:String,
        unique:true
     },

     contactNumber:{
         type:String,

     },

     
    //check for admin or user 
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }


},{timestamps:true});

//timestamps are time since this document was loaded



//using for this schema in controller
module.exports =mongoose.model("User",userSchema);