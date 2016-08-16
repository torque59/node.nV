var User   = require('../models/user'); // get our mongoose model

exports.authenticate=function(username,password){
	User.findOne({
		name: username
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			// check if password matches
			if (user.password != password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
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


exports.register = function(user){
	var user = new User({ 
		name: 'testuser', 
		password: 'password',
		admin: true 
	});
	user.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully');
		return true;
	});
}	


exports.getPublicUsers=function(){
	User.find({}, function(err, users) {
		res.json(users);
	});
}


exports.getUserById=function(id){
	User.findById(id, function(err, user) {
		if(err){ return err;}
		return user;
	});
	return null;
}

exports.upgradeToPremium=function(id){
	User.update({"id":id},{ $set: { isPremium: true }},function(err,user){
		if(err){return err;}
		return true;
	});
	return false;
}


exports.deleteAccount=function(id){
	User.findByIdAndRemove(id,function(err){
		if(err){return err;}
		return true;
	});
	return false;
}





