var User   = require('../models/user');
var Listing   = require('../models/listing'); // get our mongoose model
//Employee Stuffs


exports.updateEmployeeUsername=function(id,username,callback){
	User.update({_id:id},{ $set: { username: username }}, callback());
}


exports.applyForJob=function(id,username,callback){
	User.update({_id:id},{ $set: { username: username }}, callback());
}

exports.listInterviews=function(id,callback){
		User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user.interviews);
		}	
		});
}

exports.listOffers=function(id,callback){
	User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user.offers);
		}	
		});
}

exports.listSentApplications=function(id,callback){
	User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user.applications);
		}	
		});
}


exports.getListings = function(id,callback){
		Listing.find({}, function(err, listings) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,listings);
		}	
		});
}







