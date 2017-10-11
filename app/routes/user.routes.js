var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var authMiddleware = require('../middlewares/auth.middleware');


router.post('/signup', UserController.addUser);
router.post('/login', UserController.login);
router.post('/fetch',authMiddleware, UserController.getUsers);

router.get('/', function(req, res, next){
    res.status(200);
    res.json({
        message: 'Cool...'
    });
});

module.exports = router;
