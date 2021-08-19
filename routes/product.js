const express = require('express');
const router = express.Router();

const {create,productById,readProduct,removeProduct,updateProduct,listProducts,getPhoto,listSearch} = require("../controllers/product");


router.post('/product/create',create);

//route for get single product
router.param("productId",productById);

router.get('/product/:productId',readProduct);

//delete single product
router.delete('/product/:productId',removeProduct);

//update single product
router.put('/product/:productId',updateProduct)

//return all the products
router.get('/products',listProducts);

//take product Photo

router.get('/product/photo/:productId',getPhoto);

//searching
router.get("/products/search", listSearch);

module.exports = router;


