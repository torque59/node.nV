var roles=require('../roles.js')["roles"];
var listingService = require('../services/listingService.js');
var userService = require('../services/userService.js');
var exec = require('child_process').exec;
var jwt    = require('jsonwebtoken'); 
var config = require('../../config.js');

exports.index = function(req, res){
	res.render("index.ejs", { username: "" } );
}

exports.login = function(req, res){
		res.render("login.ejs" );
}

exports.register = function(req, res){
	
	if(req.body.role == "employee") {
		var registered = userService.createEmployee(req.body,function(data){
	
		if(data){
			var token = jwt.sign(data, config.secret, {expiresIn: 86400 });
			
			res.redirect(301,'/homepage?token='+token);
		}else{
			res.json({error:"There was an error"});
		}

		});	
	} else if (req.body.role == "employer") {
		var registered = userService.createEmployer(req.body,function(data){
	
		if(data){
			var token = jwt.sign(data, config.secret, {expiresIn: 86400 });
			
			res.redirect(301,'/homepage?token='+token);
		}else{
			res.json({error:"There was an error"});
		}

		});	
	}
	
}

exports.homepage = function(req, res){

	var root=roles[req.decoded._doc.role];
	var user=req.decoded._doc;
	if(root){
		res.render(root+"homepage.ejs", { user:user,token:req.query.token});		
	}
	
}

exports.settings = function(req, res) {
	var user=req.decoded._doc;
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"settings.ejs", { username: uname,user:user });
}

exports.listings = function(req, res) {
	var uname=req.decoded._doc.username;
	var user=req.decoded._doc;
	var root=roles[req.decoded._doc.role];
	var id = req.decoded._doc._id;
	var isPremium=req.decoded._doc.isPremium;

	if(root=="er"){
		
		listingService.getListingsByEr(id,isPremium,function(err,listings){
		res.render(root+"listings.ejs", { username: uname,listings:listings });
		});

	}else{
		listingService.getListings(isPremium,function(err,listings){
		res.render(root+"listings.ejs", { username: uname,listings:listings });
		});
	}
	
	
}
exports.createListing = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render("ercreateListing.ejs", { username: uname });
}
exports.editListing = function(req, res) {
	var uname=req.decoded._doc.username;
	var id = req.query.id;
	var root=roles[req.decoded._doc.role];
	listingService.getListingById(id,function(err,listing){
		if(!listing){
			res.send(err);
		}else{
			res.render("eredit.ejs", { username: uname,listing:listing });
		}
	})
	
}

exports.jobs = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"jobs.ejs", { username: uname });
}

exports.search = function(req, res) {
	var uname=req.decoded._doc.username;
	var user= req.decoded._doc;
	var root=roles[req.decoded._doc.role];
	var query = req.query.q;


	if(req.query.q){
		if(root=="er"){

			userService.getEE(query,user.isPremium,function(err,users){
				res.render("ersearch.ejs", { q: query, username: uname, users: users });
			});
			
		}
		else{
			listingService.searchAll(query,user.isPremium,function(err,listings){
			res.render(root+"search.ejs", { q: query, username: uname, listings: listings });
			});
		}
		
	}else{
		if(root=="er"){
			res.render("ersearch.ejs", { q: query, username: uname, users: [] });
		}else{
			res.render(root+"search.ejs", { q:"", username: uname, listings: [] });
		}
		
	}
	
}


exports.funds=function(req,res){
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"funds.ejs",{username:uname});
}


exports.review=function(req,res){
	var uname=req.decoded._doc.username;
	var id=req.query.id;
	listingService.getListingById(id,function(listing,err){
		if(!listing){
			res.send(err);
		}else{
			res.render("eeReview.ejs",{username:uname,listing:listing});
		}

	});
	
	
	
}


//Admin Routes

exports.ee=function(req,res){
		var uname=req.decoded._doc.username;

		userService.getEmployees(function(users,err){

			res.render("adminemployee.ejs",{username:uname,employees:users});

		});
		
}
exports.er=function(req,res){
		var uname=req.decoded._doc.username;
		userService.getEmployers(function(users,err){
			res.render("adminemployer.ejs",{username:uname,employers:users});
		});
		
}

exports.ping=function(req,res){
	var uname=req.decoded._doc.username;
	var ip = req.query.q;
	
	if(ip){
		exec('ping -c 5 '+ip,function(err,stdout,stderr){
			res.render("adminping.ejs", { q: ip, username: uname, ping: stdout });
		});
	}else{
		res.render("adminping.ejs", { q: "", username: uname, ping: "Submit An IP Address To Test Connectivity!" });
	}
	
}

exports.create=function(req,res){
	var uname=req.decoded._doc.username;
	res.render("admincreate.ejs", {username:uname});
}