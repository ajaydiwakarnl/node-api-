const express = require('express');
const route = express.Router();
const apiController = require('../controller/ApiController');

route.post('/api/register', [apiController.register]);
route.post('/api/login', [apiController.doLogin]);

module.exports = route;
