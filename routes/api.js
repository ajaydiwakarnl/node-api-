const express = require('express');
const route = express.Router();
const userController = require('../controller/UserController');
const addressController = require('../controller/AddressController');
const uploadImage = require("../helpers/imageUpload");
const baseUrl = "/foodapp/api";


/****************************************************************************************/
/************************** USER RELATED ROUTE *****************************************************/
/*****************************************************************************************/

    route.post(`${baseUrl}/register`,[uploadImage('users').single('image'),userController.userRegistration]);
    route.post(`${baseUrl}/login`, [uploadImage('').none(),userController.doLogin]);

/****************************************************************************************/
/*********************** USER RELATED ROUTE *****************************************************/
/*****************************************************************************************/

/****************************************************************************************/
/*********************** ADDRESS RELATED ROUTE *****************************************************/
/*****************************************************************************************/

    route.get(`${baseUrl}/address/`,[uploadImage('').none(),addressController.index])
    route.post(`${baseUrl}/address/add`,[uploadImage('').none(),addressController.create]);
    route.post(`${baseUrl}/address/edit`,[uploadImage('').none(),addressController.update]);



/****************************************************************************************/
/*********************** ADDRESS RELATED ROUTE *****************************************************/
/*****************************************************************************************/

/*
route.get('/api/products', [productController.index]);
route.post('/api/register', [uploadImage('users').single('image'), userController.userRegistration]);
route.post('/api/product', [uploadImage('products').single('image'), productController.createProduct]);
route.post('/api/product/changeStatus', [productController.changeStatus]);
route.get('/api/product/:id', [productController.getProduct]);
route.post('/api/product/:id', [uploadImage('products').single('image'), productController.editProduct]);
route.get('/api/product/search/:keyword', [productController.index]);
*/

module.exports = route;
