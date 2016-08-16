var User   = require('../models/user'); 
var Listing   = require('../models/listing'); 
var Review   = require('../models/review'); 
var jwt    = require('jsonwebtoken'); 
var config = require('../../config.js');
var employeeService = require("../services/employeeService.js");

exports.updateEmployeeUsername=function(req,res){
	var id=req.decoded._doc._id;
	employeeService.updateEmployeeUsername(id,req.body.username,function(err){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
}

exports.applyForJob = function(req,res){
	var id=req.decoded._doc._id;
	employeeService.applyForJob({},function(err){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
	res.send("ToDo");
}
exports.listInterviews = function(req,res){
	res.send("ToDo");
}

exports.listOffers = function(req,res){
	res.send("ToDo");
}
exports.listSentApplications = function(req,res){
	res.send("ToDo");
}

exports.searchForJobs = function(req,res){
	res.send("ToDo");
}
exports.employeeUpgradeToPremium = function(req,res){
	res.send("ToDo");
}

exports.writeReview = function(req,res){
	res.send("ToDo");
}

exports.followEmployer = function(req,res){
	res.send("ToDo");
}