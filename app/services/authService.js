
exports.isAuthenticated = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		req.flash("error", "You must authenticated to access this page!")
		res.redirect(302, "/")
	}
}

exports.isEmployee = function(req,res,next){
	if (req.user && (req.user.role === 1)) {
		next();
	} else {
		req.flash("error", "You do not have access this page!")
		res.redirect(302, "/homepage")
	}
	
}

exports.isEmployer = function(req,res,next){
	if (req.user && (req.user.role === 2)) {
		next();
	} else {
		req.flash("error", "You do not have access this page!")
		res.redirect(302, "/homepage")
	}
	
}

exports.isAdmin = function(req,res,next){
	
	
}


