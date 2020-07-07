const express = require('express');//used const becuase you want to change imported library which leads to bug/error
const app = express();//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
const morgan = require('morgan');//for getting more logs on terminal
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//as a database
const cors = require('cors');//to prevent Cross-Origin Resource Sharing(CORS)

// middleware to check whether user is authenticated or not
const checkAuth = require('./middleware/checkAuth');

mongoose.connect('mongodb://127.0.0.1/SeMEnD', {
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

// mongoose.Promise = global.Promise;

//also must see https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use

// Used to log everything like GET, POST, etc requests
app.use(morgan('dev'));

// This attach headers from servers to client to tell browser that CORS(cross origin request bla bla) is OK
app.use(cors());

// extended true allows to parse extended body with rich data in it
// extended false allows only simple bodies for urlencoded data
app.use(bodyParser.urlencoded({extended: false}));

// Extracts json data and makes it easy readable to us
app.use(bodyParser.json());

// To make uploads folder publically available with routes
app.use(express.static(__dirname + '/media/uploads'));

// Routes
app.use('/api/signIn', require('./routes/signin'));//all endpoint starting from /api/signIn will use this
app.use('/api/signUp', require('./routes/signup'));
app.use('/api/upload',checkAuth, require('./routes/upload'));
app.use('/api/postLists',checkAuth, require('./routes/postLists'));
app.use('/api/update',checkAuth, require('./routes/update'));

module.exports = app;