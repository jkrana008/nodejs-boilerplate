var express = require('express');
var routes = express.Router();
var UserController = require('../controllers/user');
var authMiddleware = require('../middlewares/auth.middleware');


routes.get('/users', authMiddleware, UserController.getUsers);

module.exports = routes;