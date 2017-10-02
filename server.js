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

app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// app.get('/setup', function (req, res) {
//     var nick = new User({
//         name: 'Nick Cerminara',
//         password: 'password',
//         admin: true
//     });

//     nick.save(function (err) {
//         if (err) throw err;

//         console.log('User saved successfully');
//         res.json({ success: true });
//     });
// });
app.use('/apis', routes);

app.get('/setup', UserController.addUser);

var apiRoutes = express.Router();

apiRoutes.post('/authenticate', UserController.login);

// apiRoutes.post('/authenticate', function (req, res) {

//     User.findOne({
//         name: req.body.name
//     }, function (err, user) {
//         if (err) throw err;

//         if (!user) {
//             res.json({ success: false, message: 'User not found' });
//         } else if (user) {
//             if (user.password != req.body.password) {
//                 res.json({ success: false, message: 'Wrong password' });
//             } else {
//                 console.log(user);
//                 var token = jwt.sign({ data: user }, app.get('superSecret'), { expiresIn: '1h' });


//                 res.json({
//                     success: true,
//                     message: 'Enjoy your token',
//                     token: token
//                 });
//             }
//         }
//     });
// });

// apiRoutes.use(function (req, res, next) {
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

//     if (token) {

//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 console.log('Error',err);
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided'
//         });
//     }
// });
apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// apiRoutes.get('/users', function (req, res) {
//     User.find({}, function (err, users) {
//         res.json(users);
//     });
// });

apiRoutes.get('/users', authMiddleware, UserController.getUsers)





app.use('/api', apiRoutes);


app.listen(port);
console.log('Magic happens at http://localhost:' + port);

