var roles=require('../roles.js')["roles"];


exports.index = function(req, res){
	if (req.body.username) {
        res.render("login.ejs", { username: req.body.username, } );
    } else {
		res.render("login.ejs", { username: "", } );
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
	res.render(root+"listings.ejs", { username: uname });
}
exports.createListing = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render("ercreateListing.ejs", { username: uname });
}
exports.jobs = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"jobs.ejs", { username: uname });
}

exports.search = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"search.ejs", { q: "q", username: uname, users: ["users"] });
}


exports.funds=function(req,res){
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"funds.ejs",{username:uname});
}