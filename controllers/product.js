const Product = require("../models/product");

//formidable and lodash use for image loading
const formidable = require("formidable");
const _ = require("lodash");

const fs = require("fs");

//create productbyid middleware

exports.productById = (req, res,next,id) => {
    Product.findById(id).exec((err, product)=> {
       if(err||!product){
           return res.status(400).json({
               error:"This Product Not Found"
           });
       } 

       //if product found base on id
req.product = product;


//perform this middleware and contine application
next();

    });
}

//request a single product using above middleware
exports.readProduct=(req, res) => {

 //we will make separate request to take photo from database   
 //because photo is huge so we undefined it here and request separately

req.product.photo = undefined;

return res.json(req.product);


}

exports.create =(req, res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"image could not be uploaded"
            });
        }

        //validate all fields
        const{name,description,price,quantity,shipping} = fields;

        if(!name ||!description ||!price||!quantity||!shipping){
            return res.status(400).json({
                error: 'all fields must be required'
            });
        }


        //handle form data like name id
        let product = new Product(fields);

        if(files.photo){
            //console photo details like size 
            //console.log("file photo",files.photo);

            //check photo size and validate
            //1mb=1000000

            if(files.photo.size>1000000){
                return res.status(400).json({
                    error: 'Photo size should be less than 1mb'
                });
            }




            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err,resulst)=>{
            if(err){
                return res.status(400).json({err});
            }
            res.json(resulst);
            
        })

    })

}



//delete product 

exports.removeProduct =(req, res)=>{
    let product = req.product;

    product.remove((err,deleteProduct)=>{

        if(err) return res.status(400).json({err});

        res.json({deleteProduct,message:"product deleted successfully"});

    })



}


//update product

//in a update method we going to take a existing product
//instead of using new keywords 


exports.updateProduct =(req, res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"image could not be uploaded"
            });
        }

        //take existing product
        //for that use extend from loadash library
        let product = req.product;
        //first arguement is request second one is update fields 
        product =_.extend(product,fields);

      

        
        if(files.photo){
            //console photo details like size 
            //console.log("file photo",files.photo);

            //check photo size and validate
            //1mb=1000000

            if(files.photo.size>1000000){
                return res.status(400).json({
                    error: 'Photo size should be less than 1mb'
                });
            }




            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err,resulst)=>{
            if(err){
                return res.status(400).json({err});
            }
            res.json(resulst);
            
        })

    })

}



//sell/arrival these parameters come by frontend
//by sell = /products?sortBy=sold and order and limt
//by arrival = /products?sortBy=sold and order and limt
//if no param are send then all products are returned


exports.listProducts = (req, res) => {

//these variables are default if we doensnt sort any specific way
//take six product by default
 let order = req.query.order ? req.query.order :'asc';
 let sortBy = req.query.sortBy ? req.query.sortBy :'_id';
 let limit = req.query.limit ? parseInt(req.query.limit) :6 ;


 //this mean dont select photo
 Product.find()
                .select("-photo")
                .sort([[sortBy,order]])
                .limit(limit)
                .exec((err,data)=>{

                    if(err){
                    return res.status(400).json({error:"product not found"});
                }
                res.json(data);
            });
              

}


//take product photo separately 

exports.getPhoto = (req, res,next) => {
 
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
    
};



//search
exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
       
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
};
