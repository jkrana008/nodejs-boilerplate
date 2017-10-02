var express = require('express');
var routes = express.Router();
var UserController = require('../controllers/user');
var authMiddleware = require('../middlewares/auth.middleware');


routes.get('/users', authMiddleware, UserController.getUsers);
routes.get('/setup', UserController.addUser);
routes.post('/authenticate', UserController.login);
routes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

module.exports = routes;