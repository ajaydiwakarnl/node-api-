const express = require('express');
const route = express.Router();
const apiController = require('../controller/ApiController');
const productController = require('../controller/ProductController');

route.post('/api/register', [apiController.register]);
route.post('/api/login', [apiController.doLogin]);

//Product Routes
route.get('/api/product/index', [productController.index]);
route.post('/api/product/create', [productController.createProduct]);
route.post('/api/product/changeStatus', [productController.changeStatus]);
route.post('/api/product/editProduct', [productController.editProduct]);

module.exports = route;
