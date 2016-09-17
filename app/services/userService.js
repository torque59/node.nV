var User   = require('../models/user'); // get our mongoose model

exports.authenticate=function(username,password,callback){
	if(username==undefined||password==undefined){
		callback("Username and Password must be defined.",null);
	}
	User.findOne({
		username: username
	}, function(err, user) {
		if (err){ throw err;}
		if (!user) {
			callback("User not found",null);
		} else {
			if (user.password != password) {
				callback(true,null);
			} else {
				callback(false,user);
			}		
		}
	});
}


exports.createEmployee = function(user,callback){

	var employee1 = new User({ 
	username: 'ee1', 
	password: 'abc123!!', 
	email: 'employee1@gmail.com',
	answer: 'lol',
	firstname: 'employee1',
	lastname: 'One',
	isPremium:false,
	enabled:true,
	accountNonExpired:true,
	credentialsNonExpired:true,
	accountNonLocked:true,
	applications:[],
	interviews:[],
	offers:[],
	rejected:[],
	role:1, //employee-1 | employer-2 |admin - 3
	reviews:[],//for Premium Employees
	following:[] //If employee - employers| if employer, memp
 });
	console.log(employee1);
	employee1.save(function(err) {
		if (err) callback(err);
		console.log('User saved successfully');
		callback(true);
	});
}	


exports.createEmployer = function(user,callback){

var employer1 = new User({ 

	username: 'er1', 
	password: 'abc123!!', 
	email: 'employer1@gmail.com',
	answer: 'lol',
	firstname: 'employer',
	lastname: 'One',
	isPremium:false,
	enabled:true,
	accountNonExpired:true,
	credentialsNonExpired:true,
	accountNonLocked:true,
	applications:[],
	interviews:[],
	offers:[],
	rejected:[],
	role:2, //employee-1 | employer-2
	reviews:[],//for Premium Employees
	following:[] //If employee - employers| if employer, memp
 });
	console.log(employer1);
	employer1.save(function(err) {
		if (err) callback(err);
		console.log('User saved successfully');
		callback(true);
	});
}	

exports.createAdmin = function(user,callback){

var admin = new User({ 

	username: 'admin1', 
	password: 'abc123!!', 
	email: 'admin@gmail.com',
	answer: 'lol',
	firstname: 'employer',
	lastname: 'One',
	isPremium:false,
	enabled:true,
	accountNonExpired:true,
	credentialsNonExpired:true,
	accountNonLocked:true,
	applications:[],
	interviews:[],
	offers:[],
	rejected:[],
	role:3, //employee-1 | employer-2 |admin -3
	reviews:[],//for Premium Employees
	following:[] //If employee - employers| if employer, memp
 });
	console.log(admin);
	admin.save(function(err) {
		if (err) callback(err);
		console.log('User saved successfully');
		callback(true);
	});
}	

exports.getPublicUsers=function(callback){
	User.find({}, function(err, users) {
		if(err){
			callback(err,null);
		}else{
			callback(false,users);
		}
	
	});
}


exports.getUserById=function(id,callback){
	User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user);
		}	
	});
	
}

exports.upgradeToPremium=function(id,callback){
	User.update({"id":id},{ $set: { isPremium: true }},function(err,user){
		if(err){callback(err,null);}
		callback(false,true);
	});
	
}


exports.deleteAccount=function(id,callback){
	User.findByIdAndRemove(id,function(err){
		if(err){
			callback(err);
		}else{
			callback(false,true);
		}
		
	});
	
}

exports.getEmployees = function(callback){
	User.find({"role":1},function(users,err){
		if(err){
			callback(err);
		}else{
			callback(users);
		}
	});
}

exports.getEmployers = function(callback){
	User.find({"role":2},function(users,err){
		if(err){
			callback(err);
		}else{
			callback(users);
		}
	});
}



