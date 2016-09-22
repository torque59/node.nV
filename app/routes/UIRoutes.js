var roles=require('../roles.js')["roles"];
var listingService = require('../services/listingService.js');
var userService = require('../services/userService.js');
var exec = require('child_process').exec;

exports.index = function(req, res){
	if (req.body.username) {
        res.render("login.ejs", { username: req.body.username } );
    } else {
		res.render("login.ejs", { username: "" } );
	}
}


exports.signUp = function(req, res) {
    res.render("signup.ejs");
};

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
	var root=roles[req.decoded._doc.role];
	listingService.getListings(function(err,listings){
		res.render(root+"listings.ejs", { username: uname,listings:listings });
	})
	
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
	listingService.getListingById(id,function(listing,err){
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
	var root=roles[req.decoded._doc.role];
	var query = req.query.q;

	if(req.query.q){
		listingService.search(query,function(listings,err){
			res.render(root+"search.ejs", { q: query, username: uname, listings: listings });
		});
	}else{
		res.render(root+"search.ejs", { q:"", username: uname, listings: [] });
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