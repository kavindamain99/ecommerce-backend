//import the express and add it to variable
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//use morgan as a middleware 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


require('dotenv').config();

//for the validating purpose
const expressValidator = require('express-validator');

//middleware
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


//import the routes
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');


//routes middleware
app.use("/",userRoute);
app.use("/",categoryRoute);
app.use('/',productRoute);
//decide which port we run server

const port = process.env.PORT || 8000||3000;


// database connection

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connection established");
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});