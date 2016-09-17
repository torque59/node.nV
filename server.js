
var express 	= require('express');
var app         = express();
var bodyParser = require('body-parser')
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cookieParser = require('cookie-parser')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var user   = require('./app/models/user'); // get our mongoose model
var userroutes = require('./app/routes/userRoutes.js');
var employerroutes = require('./app/routes/employerRoutes.js');
var employeeRoutes = require('./app/routes/employeeRoutes.js');
var adminRoutes = require('./app/routes/adminRoutes.js');
var authService = require('./app/services/authService.js');

var UIRoutes = require('./app/routes/UIRoutes.js');

var port = process.env.PORT || 8081; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.use(morgan('dev'));
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


// Pull in the public directory
app.use('/public', express.static(__dirname + '/public'));

// Set Views folder
var eeViewPath=__dirname + '/views/ee';
var erViewPath=__dirname + '/views/er';
var adminViewPath=__dirname + '/views/admin';
var publicViewPath=__dirname + '/views';

app.set('views', [publicViewPath,eeViewPath,erViewPath,adminViewPath]); 

// Routes ===============
//Static Content Routing

//TEST ROUTE ONLY
app.get('/setup',userroutes.setup);


app.get('/',UIRoutes.index);
app.get('/signup',UIRoutes.signUp);


//app.post('/api/createEmployee',userroutes.createEmployee); TEST ONLY
//app.post('/api/createEmployer',userroutes.createEmployer); TEST ONLY
//app.post('/api/createAdmin',userroutes.createAdmin); TEST ONLY
app.post('/login',userroutes.login);

app.post('/api/authenticate',userroutes.login);

app.use(function(req, res, next) {
	 var token =req.cookies.token|| req.body.token || req.param('token') || req.headers['X-Access-Token'];
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


app.get('/homepage',UIRoutes.homepage);
app.get('/settings',UIRoutes.settings);
app.get('/listings',UIRoutes.listings);
app.get('/createListing',UIRoutes.createListing);
app.get('/search',UIRoutes.search);
app.get('/jobs',UIRoutes.jobs);
app.get('/funds',UIRoutes.funds);
app.get('/review',UIRoutes.review);


//Admin UI Routes
app.get('/ee',UIRoutes.ee);
app.get('/er',UIRoutes.er);
app.get('/ping',UIRoutes.ping);
app.get('/create',UIRoutes.create);
//Employer Routes

app.post('/api/employer/createListing',authService.isER,employerroutes.createListing); //Need to customize
app.get('/api/employer/getListings',authService.isER,employerroutes.getListings);
app.post('/api/employer/updateEmployer',authService.isER,employerroutes.updateEmployer); //TODO;
app.get('/api/employer/acceptForOffer',authService.isER,employerroutes.acceptForOffer);
app.get('/api/employer/acceptForInterview',authService.isER,employerroutes.acceptForInterview);
app.get('/api/employer/rejectApplication',authService.isER,employerroutes.rejectApplication);
app.post('/api/employer/editListing',authService.isER,employerroutes.editListing);
app.get('/api/employer/followEmployee',authService.isER,employerroutes.followEmployee);
app.get('/api/employer/search',authService.isER,employerroutes.search);
app.get('/api/employer/getRequestedEmployees',authService.isER,employerroutes.getRequestedEmployees);
app.delete('/api/employer/deleteRequestedApplication',authService.isER,employerroutes.deleteRequestedApplication);

//Employee Routes


app.post('/api/employee/updateEmployee',authService.isEE,employeeRoutes.updateEmployee);
app.get('/api/employee/applyForJob',authService.isEE,employeeRoutes.applyForJob);
app.get('/api/employee/listInterviews',authService.isEE,employeeRoutes.listInterviews);
app.get('/api/employee/listOffers',authService.isEE,employeeRoutes.listOffers);
app.get('/api/employee/listSentApplications',authService.isEE,employeeRoutes.listSentApplications);
app.get('/api/employee/getListings',authService.isEE,employeeRoutes.getListings);
app.get('/api/employee/upgradeToPremium',authService.isEE,employeeRoutes.employeeUpgradeToPremium);
app.post('/api/employee/writeReview',authService.isEE,employeeRoutes.writeReview);
app.post('/api/employee/followEmployer',authService.isEE,employeeRoutes.followEmployer);




//Admin Routes

app.post('/api/admin/createUser',authService.isAdmin,adminRoutes.createUser);
//app.get('/api/admin/getEmployees',authService.isAdmin,adminRoutes.getEmployees);
//app.get('/api/admin/getEmployers',authService.isAdmin,adminRoutes.getEmployers);

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