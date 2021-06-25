const express = require('express');
const route = express.Router();
const userController = require('../controller/UserController');
const uploadImage = require("../helpers/imageUpload");
const baseUrl = "/foodapp/admin";


/****************************************************************************************/
/************************** login RELATED ROUTE *******************************************/
/*****************************************************************************************/

route.post(`${baseUrl}/login`, [uploadImage('').none(), userController.adminLogin])


/****************************************************************************************/
/*********************** Login RELATED ROUTE *********************************************/
/*****************************************************************************************/



/****************************************************************************************/
/*********************** Users RELATED ROUTE *********************************************/
/*****************************************************************************************/

route.get(`${baseUrl}/users/`, [uploadImage('').none(), userController.getUserList])
route.get(`${baseUrl}/users/search/:keyword`,[uploadImage('').none(), userController.getUserList])
route.post(`${baseUrl}/users/changestatus`,[uploadImage('').none(), userController.changeStatus])
route.post(`${baseUrl}/users/getUser`,[uploadImage('').none(), userController.getUser])

/****************************************************************************************/
/*********************** Users RELATED ROUTE *********************************************/
/*****************************************************************************************/









module.exports = route;