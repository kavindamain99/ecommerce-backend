//import models from
const User = require('../models/user');

//error handler in helper folder

const {errorHandler} = require('../helpers/dbErrorHandler')




exports.signup = (req,res)=>{
 
    //signup new user
    console.log("req.body",req.body);

    //create new user based on request body
    const user = new User(req.body);
    user.save((err,user)=>{

        if(err) {
            return res.status(400).json({
            err:errorHandler(err)
        });
        }

        //if succefully save 
        res.json({
           user
        });

        
        
});
};



