var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); 
var Listing = require('../models/listing');
var config = require('../../config.js');
var employerService = require("../services/employerService.js");


exports.updateEmployerUsername=function(req,res){
		var id=req.decoded._doc._id;
		employerService.updateEmployerUsername(id,req.body.username,function(err){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
}

exports.acceptForOffer=function(req,res){
	var id=req.decoded._doc._id;
		res.send("ToDO");
}

exports.acceptForInterview=function(req,res){
	res.send("TO DO");
}

exports.rejectApplication=function(req,res){
	res.send("TO DO");
}

exports.createListing=function(req,res){
	var id=req.decoded._doc._id;
	employerService.createListing(id,req.body.listing,function(err,result){
		if(result){
			res.json({success:true});
		}else if(err){
			res.json({error:err});
		}else{
			res.json({success:false});
		}
	});
}

exports.getListings=function(req,res){
	var id=req.decoded._doc._id;
	employerService.getListings(id,function(listings,err){
		if(listings){
			res.json(listings);
		}else if(err){
			res.json({error:err});
		}else{
			res.json({success:false});
		}
	});

}

exports.editListing=function(req,res){
	res.send("TO DO");
}

//Premium Service
exports.requestApplication=function(req,res){
	var id=req.decoded._doc._id;
	employerService.requestApplication(id,req.body.employeeId,function(err,success){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});

}
//Premium Service
exports.getRequestedEmployees=function(req,res){
	var id=req.decoded._doc._id;
	employerService.getRequestedEmployees(id,function(err,requested){
		if(err){
			res.json({error:err});
		}else{
			res.json(requested);
		}

	});
}
//Premium Service
exports.deleteRequestedApplication =function(req,res){
	var employerId=req.decoded._doc._id;
	employerService.deleteRequestedEmployees(employerId,req.body.employeeId,function(err,requested){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}

	});
}



