var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); 
var config = require('../../config.js');

exports.authenticate=function(req,res){

console.log(req.body);
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, config.secret, {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});

}

exports.register=function(req,res){
	
	var user = new User({ 
		name: 'testuser', 
		password: 'password',
		admin: true 
	});
	user.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
	
}

exports.getUsers=function(req,res){
	console.log(req.decoded._doc._id);
	User.find({}, function(err, users) {
		res.json(users);
	});
}



exports.getProfile= function(req,res){
	res.send("TODO");
}

exports.upgradeToPremium= function(req,res){
	res.send("TODO");
}

exports.deleteAccount=function(req,res){
	res.send("TODO");
}









