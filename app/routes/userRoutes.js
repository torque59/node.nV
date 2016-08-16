var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); 
var config = require('../../config.js');
var userService = require("../services/userService.js");


exports.authenticate=function(req,res){
	userService.authenticate(req.body.username,req.body.password);
}

exports.register=function(req,res){
	var registered = userService.register(req.body.user);	
	if(registered){
		res.json({ success: true });
	}else{
		res.json({error:"There was an error"});
	}
	
}

exports.getPublicUsers=function(req,res){
	console.log(req.decoded._doc._id);
	userService.getUsers();
}


exports.getProfile= function(req,res){
	var user=userService.getProfile(req.decoded._doc._id);
	if(user){
		res.json(user);	
	}else{
		res.json({success:false});
	}
	
}

exports.upgradeToPremium= function(req,res){
	var upgrade = userService.upgradeToPremium(req.decoded._doc.id);
	if(upgrade){
		res.json({ success: true });
	}else{
		res.json({success:false});
	}
}

exports.deleteAccount=function(req,res){
	var deleted=userService.deleteAccount(req.decoded._doc.id);
	if(deleted){
		res.json({ success: true });
	}else{
		res.json({success:false});
	}
	
}









