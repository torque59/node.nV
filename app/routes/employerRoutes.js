var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); 
var Listing = require('../models/listing');
var config = require('../../config.js');
var employerService = require("../services/employerService.js");


exports.updateEmployer=function(req,res){
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
	var employerId=req.decoded._doc._id;
	var employeeId=req.body.employeeId;
	var listingId = req.body.listingId;
	employerService.acceptForOffer(id,req.body.listingId,function(err,result){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
		
}

exports.acceptForInterview=function(req,res){
	var employeeId=req.body.employeeId;
	var listingId=req.body.listingId;
	employerService.acceptForInterview(employeeId,listingId,function(err,success){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
}

exports.rejectApplication=function(req,res){
	var employeeId=req.body.employeeId;
	var listingId=req.body.listingId;
	employerService.rejectApplication(employeeId,listingId,function(err,success){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
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
	employerService.getListingsByOwner(id,function(listings,err){
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

//Premium Services ================================================================================================================================
exports.followEmployee=function(req,res){
	var employerId=req.decoded._doc._id;
	var employeeId=req.body.employeeId;
	employerService.followEmployee(employerId,employeeId,function(err,success){
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



