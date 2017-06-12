var User   = require('../models/user'); 
var Listing   = require('../models/listing');
var Application = require('../models/application');
var config = require('../../config.js');
var employeeService = require("../services/employeeService.js");
var listingService = require("../services/listingService.js");

exports.apply = function(req, res) {
	id = req.query.id;
	listingService.getListingById(id,function(listing,err){
		if(!listing){
			console.log(err);
			res.send(err);
		}else{
			res.render("eeApplication.ejs",{user:req.user,listing:listing});
		}

	});
}

exports.submitApplication = function(req, res) {
	var app = new Application({ 
	_creator : req.user._id,
	reasonApplied: req.body.reasonApplied,
	background: req.body.background,
	_listing : req.body.listingId
	});
	
	app.save(function(err) {
		if (err){
			req.flash("error", err.toString());
			res.redirect("/apply?id=" + req.body.listingId)
		} else {
			res.send("yay");
		}
	});	
	//res.send(typeof req.body.listingId)
}

exports.updateEmployee=function(req,res){
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
	var listingId=req.query.listingId;
	employeeService.applyForJob(id,listingId,function(err){
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
	employeeService.listSentApplications(id,function(err,sent){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:sent});
		}
	});
}

exports.searchForJobs = function(req,res){
	var id=req.decoded._doc._id;
	employeeService.getListings(function(listings,err){
		if(listings){
			res.json(listings);
		}else if(err){
			res.json({error:err});
		}else{
			res.json({success:false});
		}
	});
}

