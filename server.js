var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./app/config');
var User = require('./app/models/user');
var UserController = require('./app/controllers/user');
var authMiddleware = require('./app/middlewares/auth.middleware');

var routes = require('./app/routes/routes');


var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(morgan('dev'));

app.use('/api', routes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

