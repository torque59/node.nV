var User   = require('../models/user'); // get our mongoose model

exports.authenticate=function(username,password,callback){
	console.log(username+":"+password);
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


exports.register = function(user,callback){

	var user = new User({ 
		username: 'testuser1', 
		password:'abc123!!',
		email:'testuser@gmail.com',
		answer:'lol',
		firstname:'test',
		lastname:'user',
		ifPremium:false,
		enabled:true,
		accountNonExpired:true,
		credentialsNonExpired:true,
		role:1,
		reviews:[],
		following:[],
		suggestions:[] 
	});
	console.log(user);
	user.save(function(err) {
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

