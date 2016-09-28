var Listing   = require('../models/listing');

exports.getListings = function(isPremium,callback){
	if(isPremium){
		Listing.find({}, function(err, listings) {
		if(err){ 
			callback(err,listings);
		}
		else{
			callback(err,listings);
		}	
		});

	}else{
		Listing.find({isPremium:false}, function(err, listings) {
		if(err){ 
			callback(err,[]);
		}
		else{
			callback(false,listings);
		}	
		});

	}
		
}

exports.getListingsByEr = function(id,isPremium,callback){


	if(isPremium){
		Listing.find({"owner.id":id}, function(err, listings) {

		if(err){ 

			callback(err,listings);
		}
		else{
			console.log(err);

			callback(err,listings);
		}	
		});
	}else{

		Listing.find({"owner.id":id,"isPremium":false}, function(err, listings) {

				console.log(id);
		if(err){ 
			callback(err,listings);
		}
		else{
			callback(err,listings);
		}	
		});
	}	
		
}


exports.searchAll = function(q,isPremium,callback){

if(isPremium){
	
	Listing.find({description:RegExp(q,'i')}, function(err, doc) {
		if(err){
			callback(err,doc);
		}else{

			callback(err,doc);
		}
	});
}else{
	Listing.find({description:RegExp(q,'i'),isPremium:false}, function(err, doc) {
		if(err){
			callback(err,doc);
		}else{
			callback(err,doc);
		}
	});
}
	
}

exports.searchER = function(id,q,isPremium,callback){

	if(isPremium){
			Listing.find({"owner.id":id}, function(err, doc) {
		if(err){
			
			callback(err,doc);
		}else{

			callback(err,doc);
		}
		});
	}else{
		Listing.find({"owner.id":id,isPremium:false}, function(err, doc) {
		if(err){
			callback(err,doc);
		}else{
			callback(err,doc);
		}
		});

	}

	
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
			callback(err,[]);
		}else{
			callback(err,listing);
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

exports.createListing= function(user,listing,callback){

	var newListing= Listing();
	newListing.owner={};
	newListing.owner.id=user._id;
	newListing.owner.name=user.username;
	
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
		callback(false,newListing);
	});	
}