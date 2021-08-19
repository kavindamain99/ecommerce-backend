const mongoose = require('mongoose');


//for the relationship to category model
//const{ObjectId} =mongoose.Schema;


const productSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,

},

description:{
    type:String,
    required:true,
    maxLength:2000

},
price:{
    type:Number,
    required:true,
    
},

/*
//make relationship with category model
category:{
    Type:ObjectId,
    ref:'Category'
    

},
*/
quantity:{
    type:Number
},


sold:{
    type:Number,
    default:0

},


photo:{
    data:Buffer,
    contentType:String

},

shipping:{
    required:false,
    type:Boolean
}

},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);