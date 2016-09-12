var Listing   = require('../models/listing');

exports.getListings = function(callback){
		Listing.find({}, function(err, listings) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,listings);
		}	
		});
}
