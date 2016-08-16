var User   = require('../models/user'); // get our mongoose model
//Employee Stuffs


exports.updateEmployeeUsername=function(id,username,callback){
	User.update({_id:id},{ $set: { username: username }}, callback());
}


exports.applyForJob=function(id,username,callback){
	User.update({_id:id},{ $set: { username: username }}, callback());
}