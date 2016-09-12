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
	console.log("***********");
	var root=roles[req.decoded._doc.role];
	if(root){
		res.render(root+"homepage.ejs", { myVar:"Username",token:req.query.token});		
	}
	
}

exports.settings = function(req, res) {
	var root=roles[req.decoded._doc.role];
	res.render(root+"settings.ejs", { username: "Username" });
}

exports.listings = function(req, res) {
	var root=roles[req.decoded._doc.role];
	res.render(root+"listings.ejs", { username: "Username" });
}

exports.jobs = function(req, res) {
	var root=roles[req.decoded._doc.role];
	res.render(root+"jobs.ejs", { username: "Username" });
}

exports.search = function(req, res) {
	var root=roles[req.decoded._doc.role];
	res.render(root+"search.ejs", { q: "q", username: "req.user.username", users: ["users"] });
}


exports.funds=function(req,res){
	var root=roles[req.decoded._doc.role];
	res.render(root+"funds.ejs");
}