var jwt = require('jsonwebtoken');

var User = require('../models/user');
var config = require('../config');

function addUser(req, res) {
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });

    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
}

function login(req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'User not found' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Wrong password' });
            } else {
                console.log(user);
                var token = jwt.sign({ data: user }, config.secret, { expiresIn: '1h' });
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                });
            }
        }
    });
}

function getUsers(req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
}

module.exports = {
    addUser: addUser,
    login: login,
    getUsers: getUsers
}