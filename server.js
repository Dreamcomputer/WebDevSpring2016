
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat'
}));

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);

