
var express 	= require('express');
var app         = express();
var bodyParser = require('body-parser')
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var user   = require('./app/models/user'); // get our mongoose model
var userroutes = require('./app/routes/userRoutes.js');
var employerroutes = require('./app/routes/employerRoutes.js');
var employeeRoutes = require('./app/routes/employeeRoutes.js');
var authService = require('./app/services/authService.js');

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.use(morgan('dev'));
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes ===============

app.get('/',function(req,res){

	//Build out FrontEnd Routes
	res.send("Cowabungaaa!");
})

app.get('/test',function(req,res){
	console.log(req.params.token);
	res.send("Your body is: "+req.body);
});

//app.post('/api/createEmployee',userroutes.createEmployee); TEST ONLY
//app.post('/api/createEmployer',userroutes.createEmployer); TEST ONLY
//app.post('/api/createAdmin',userroutes.createAdmin); TEST ONLY
app.post('/api/authenticate',userroutes.authenticate);

app.use(function(req, res, next) {
	var token = req.body.token || req.param('token') || req.headers['X-Access-Token'];
	authService.authorize(token,app.get('superSecret'),function(err,decoded){
			if(err){
				return res.json({ success: false, message: err });
			}else{
				req.decoded = decoded;
				next();
			}
		});
});
app.get('/api/getPublicUsers',userroutes.getPublicUsers); //TEST ONLY
//app.get('/api/getUserById',userroutes.getUserById); TEST ONLY
//User Routes

//app.get('/api/getPublicUsers',userroutes.getPublicUsers);
//app.get('/api/getProfile',userroutes.getProfile);




//Employer Routes

app.post('/api/employer/createListing',employerroutes.createListing); //Need to customize
app.get('/api/employer/getListings',employerroutes.getListings);
app.post('/api/employer/updateEmployer',employerroutes.updateEmployer); //TODO;
app.get('/api/employer/acceptForOffer',employerroutes.acceptForOffer);
app.get('/api/employer/acceptForInterview',employerroutes.acceptForInterview);
app.get('/api/employer/rejectApplication',employerroutes.rejectApplication);
app.post('/api/employer/editListing',employerroutes.editListing);
app.get('/api/employer/followEmployee',employerroutes.followEmployee);
app.get('/api/employer/getRequestedEmployees',employerroutes.getRequestedEmployees);
app.delete('/api/employer/deleteRequestedApplication',employerroutes.deleteRequestedApplication);

//Employee Routes


app.post('/api/employee/updateEmployee',employeeRoutes.updateEmployee);
app.post('/api/employee/applyForJob',employeeRoutes.applyForJob);
app.get('/api/employee/listInterviews',employeeRoutes.listInterviews);
app.get('/api/employee/listOffers',employeeRoutes.listOffers);
app.get('/api/employee/listSentApplications',employeeRoutes.listSentApplications);
app.get('/api/employee/getListings',employeeRoutes.getListings);
app.post('/api/employee/upgradeToPremium',employeeRoutes.employeeUpgradeToPremium);
app.post('/api/employee/writeReview',employeeRoutes.writeReview);
app.post('/api/employee/followEmployer',employeeRoutes.followEmployer);



//Admin Routes
/** TODO: Build out the Admin Panel
app.get('/api/admin/getUsers',adminRoutes.getUsers);
app.post('/api/admin/updateEmployer',adminRoutes.updateEmployer);
app.post('/api/admin/updateEmployee',adminRoutes.updateEmployee);
app.post('/api/admin/createEmployee',adminRoutes.createEmployee);
app.post('/api/admin/createEmployer',adminRoutes.createEmployer);
app.post('/api/admin/lockAccount',adminRoutes.lockAccount);
app.post('/api/admin/deactivateAccount',adminRoutes.deactivateAccount);
app.delete('/api/admin/deleteAccount',userroutes.deleteAccount);
**/

app.listen(port);
console.log('Magic happens at http://localhost:' + port);