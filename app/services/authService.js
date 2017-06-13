
exports.isEE = function(req,res,next){
	console.log(req.decoded);
	if(req.decoded._doc.role==1){
		next();
	}else{
		res.status(403).send("Unauthorized");
	}
	
}

exports.isER = function(req,res,next){
	console.log(req.decoded);
	if(req.decoded._doc.role==2){
		next();
	}else{
		res.status(403).send("Unauthorized");
	}
	
}

exports.isAdmin = function(req,res,next){
	console.log(req.decoded);
	if(req.decoded._doc.role==3){
		next();
	}else{
		res.status(403).send("Unauthorized");
	}
	
}


