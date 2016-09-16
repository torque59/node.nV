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

exports.search = function(q,callback){
	//new RegExp('^'+q+'$', "i")
	var exp="/"+q+"/i";
	Listing.find({description:new RegExp(q, 'i')}, function(err, doc) {
		if(err){
			callback(err);
		}else{
			callback(doc);
		}
});

	exports.writeReview = function(id,rev,callback){
		Listing.findById(id,function(listing,err){
			if(err){
				callback(err);
			}else{
				review = {};
				

			}
		});

	}


}