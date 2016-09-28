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

exports.getListingsByEr = function(id,callback){
		
		Listing.find({"owner":id}, function(err, listings) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,listings);
		}	
		});
}


exports.searchAll = function(q,callback){


	Listing.find({description:RegExp(q,'i')}, function(err, doc) {
		if(err){
			callback(err);
		}else{
			callback(doc);
		}
	});
}

exports.searchER = function(id,q,callback){

	Listing.find({owner:id}, function(err, doc) {
		if(err){
			callback(err);
		}else{
			callback(doc);
		}
	});
}


exports.writeReview = function(id,rev,callback){
	Listing.findById(id,function(listing,err){
		if(err){
			callback(err);
		}else{
			review = {};
			

		}
	});

}

exports.getListingById=function(id,callback){
	Listing.findById(id,function(err,listing){
		if(err){
			callback(false,err);
		}else{
			callback(listing);
		}
	});
}

exports.editListing=function(listing,callback){
	var id=listing.id;
	Listing.findById(id,function(err,old){
		if(err){
			callback(false,err);
		}else{
			old.name=listing.name;
			old.description=listing.description;
			old.deadline=listing.deadline;
			old.isPremium="true"==listing.ispremium;

			old.save(function(err){
				if(err){
					callback(err);
				}else{
					callback(false,"Success!");
				}
			})
		}
	});
}

exports.createListing= function(id,listing,callback){
//Take this out when wiring to UI
	var newListing= Listing();
	newListing.owner=id;
	newListing.name=listing.name;
	newListing.description =listing.description;
	newListing.created=new Date();
	newListing.deadline=listing.deadline;
	newListing.isPremium=listing.isPremium;
	newListing.applied=[];
	newListing.interview=[];
	newListing.offer=[];

	
	newListing.save(function(err) {
		if (err) callback(err);
		console.log('Listing saved successfully');
		callback(false,true);
	});	
}