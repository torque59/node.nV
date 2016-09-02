
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
	res.render("homepage.ejs", { myVar:"Username" });
}

exports.settings = function(req, res) {
	res.render("settings.ejs", { username: "Username" });
}

exports.listings = function(req, res) {
	res.render("listings.ejs", { username: "Username" });
}

exports.jobs = function(req, res) {
	res.render("jobs.ejs", { username: "Username" });
}

exports.search = function(req, res) {
	res.render("search.ejs", { q: "q", username: "req.user.username", users: ["users"] });
}