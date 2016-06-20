
/**
 * Created by Rammer on 6/15/16.
 */

/** FOR PROJECT **/


 var express = require('express');
 var app = express();
 app.use(express.static(__dirname + '/public'));

 var session = require('express-session');
 app.use(session({
    secret: 'keyboard cat'
}));

 // Assignmnet 5: DB programming with MongoDB and Mongoose
 var mongoose = require('mongoose');
 var connectionString = 'mongodb://127.0.0.1:27017/CheckLogApp';

 var db = mongoose.connect(connectionString);
 var UserModel = require("./public/project/server/models/user.model.js")(mongoose, db);


 // install, load, and configure body parser module
 var bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

 require("./public/project/server/app.js")(app, mongoose, db, UserModel);
 app.listen(port, ipaddress);



/** FOR ASSIGNMENT
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat'
}));

// Assignmnet 5: DB programming with MongoDB and Mongoose
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/FormBuilderApp';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    console.log("Password: " +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD);
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);
var UserModel = require("./public/assignment/server/models/user.model.js")(mongoose, db);


// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, mongoose, db, UserModel);
app.listen(port, ipaddress);

**/