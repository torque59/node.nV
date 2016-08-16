
var express 	= require('express');
var app         = express();
var bodyParser = require('body-parser')
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var user   = require('./app/models/user'); // get our mongoose model
var userroutes = require('./app/routes/userRoutes.js');

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.use(morgan('dev'));
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes ===============

app.get('/',function(req,res){
	res.send("Cowabungaaa!");
})

app.post('/test',function(req,res){
	console.log(req.body);
	res.send("Your body is: "+req.body);
});
app.get('/api/register',userroutes.register);
app.post('/api/authenticate',userroutes.authenticate);

app.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	
	if (token) {

		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});
//app.get('/api/getUsers',userroutes.getUsers);
//app.get('/api/getUserById',userroutes.getUserById);
//User Routes
app.post('/api/authenticate',userroutes.authenticate);
app.post('/api/register',userroutes.register);
app.get('/api/getPublicUsers',userroutes.getPublicUsers);
app.get('/api/getProfile',userroutes.getProfile);
app.post('/api/upgradeToPremium',userroutes.upgradeToPremium);
app.post('/api/deleteAccount',userroutes.deleteAccount);






app.listen(port);
console.log('Magic happens at http://localhost:' + port);