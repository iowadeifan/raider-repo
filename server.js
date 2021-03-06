/**********
File: server.js
Purpose; This is the main file to setup environment and start the application
***********/

//Setup the required dependencies

var express = require('express');
var engine = require('ejs-locals');

var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var configDB = require('./config/database.js');
console.log('***********************' + configDB.url + '****************');

mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

//Setup configuration for our application
app.configure(function(){
	
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
	app.engine('ejs',engine);
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
	
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Application now running on ' + port);






