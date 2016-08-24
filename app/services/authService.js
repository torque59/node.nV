var jwt    = require('jsonwebtoken');

exports.authorize=function(token,secret,callback){
	if (token) {
		jwt.verify(token, secret, function(err, decoded) {			
			if (err) {
				callback(err);		
			} else {
				callback(false,decoded);
			}
		});
	} else {
		callback("Token Not Valid");
	}
}

