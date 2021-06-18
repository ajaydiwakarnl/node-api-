const express = require('express');
const route = express.Router();
const multer = require("multer");
const storageToDisk = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/product/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploadProductImage = multer({ storage: storageToDisk });

const apiController = require('../controller/ApiController');
const productController = require('../controller/ProductController');

route.post('/api/register', [apiController.register]);
route.post('/api/login', [apiController.doLogin]);

//Product Routes
route.get('/api/products', [productController.index]);
route.post('/api/product', [uploadProductImage.single('image'), productController.createProduct]);
route.post('/api/product/changeStatus', [productController.changeStatus]);
route.get('/api/product/:id', [productController.getProduct]);
route.post('/api/product/:id', [uploadProductImage.single('image'), productController.editProduct]);
route.get('/api/product/search/:keyword', [productController.index]);

module.exports = route;
