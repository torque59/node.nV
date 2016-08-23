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

}
exports.listInterviews = function(req,res){
	var id=req.decoded._doc._id;
	employeeService.listInterviews(id,function(err,interviews){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:interviews});
		}
	});
}

exports.listOffers = function(req,res){
	var id=req.decoded._doc._id;
	employeeService.listOffers(id,function(err,offers){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:offers});
		}
	});
}
exports.listSentApplications = function(req,res){
	var id=req.decoded._doc._id;
	employeeService.listSentApplication(id,function(err,sent){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:offers});
		}
	});
}

exports.searchForJobs = function(req,res){
	var id=req.decoded._doc._id;
	employeeService.getListings(id,function(listings,err){
		if(listings){
			res.json(listings);
		}else if(err){
			res.json({error:err});
		}else{
			res.json({success:false});
		}
	});
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