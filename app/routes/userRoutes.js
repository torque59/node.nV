var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); 
var config = require('../../config.js');
var userService = require("../services/userService.js");
var listingService = require("../services/listingService.js");
var data = require("../../mockdata.js");


exports.login=function(req,res){
	userService.authenticate(req.body.username,req.body.password,function(err,user){
		if(err){
			res.json({"error":err});
		}else{
			var token = jwt.sign(user, config.secret, {expiresIn: 86400 });
			
			res.redirect('/homepage?token='+token);
		}
	});

}

exports.logout=function(req,res){
	res.cookie("token","");
	res.redirect('/');
}

exports.createEmployee=function(req,res){
	var registered = userService.createEmployee(req.body.user,function(data){
	
	if(data){
		res.json({ success: true });
	}else{
		res.json({error:"There was an error"});
	}

	});	
}

exports.createEmployer=function(req,res){
	var registered = userService.createEmployer(req.body.user,function(data){
	if(data){
		res.json({ success: true });
	}else{
		res.json({error:"There was an error"});
	}
	});	
}

exports.getPublicUsers=function(req,res){
	userService.getPublicUsers(function(err,users){
		if(err){
			res.json({"error":err});
		}else{
			res.json(users);
		}
	});
}


exports.getProfile= function(req,res){
	userService.getUserById(req.decoded._doc._id,function(err,user){
		if(user){
			res.json(user);	
		}else{
			res.json({success:false});
		}
	});
}

exports.upgradeToPremium= function(req,res){
	userService.upgradeToPremium(req.decoded._doc.id,function(err,upgrade){
		if(upgrade){
		res.json({ success: true });
		}else{
		res.json({success:false});
		}
	});
	
}

exports.deleteAccount=function(req,res){
	userService.deleteAccount(req.decoded._doc.id,function(err,deleted){
		if(deleted){
			res.json({ success: true });
		}else if(err){
			res.json({success:err});
		}else{
			res.json({success:false});
		}
	});
	
	
}


exports.setup = function(req,res){

	var ee1= data.ee1;
	var ee2=data.ee2;
	var er1= data.er1;
	var er2=data.er2;
	var admin=data.admin;
	var listings=data.listings;
	userService.createAdmin(admin,function(err){
		userService.createEmployee(ee1,function(err){
			userService.createEmployee(ee2,function(err){
				userService.createEmployer(er1,function(err){
					userService.createEmployer(er2,function(err){

						listingService.createListing(er1._id,listings[0],function(err){
							listingService.createListing(er1._id,listings[1],function(err){
								listingService.createListing(er1._id,listings[2],function(err){
									listingService.createListing(er1._id,listings[3],function(err){
										listingService.createListing(er2._id,listings[4],function(err){								
											listingService.createListing(er2._id,listings[5],function(err){
												listingService.createListing(er2._id,listings[6],function(err){
													listingService.createListing(er2._id,listings[7],function(err){
														listingService.createListing(er2._id,listings[8],function(err){
										

															res.send("Created Data");

										
										
														})			
													})
												})
											})	
										})								
									})
								})
							})
						})
						
					})
				})
			})
		})

	})

}









