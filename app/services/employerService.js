var User   = require('../models/user'); // get our mongoose model
var Listing   = require('../models/listing');
//Employer Stuffs

exports.updateEmployerUsername=function(id,username,callback){
	User.update({_id:id},{ $set: { username: username }}, callback());
}

exports.createListing= function(id,listing,callback){

	var newListing= Listing();
	newListing.owner=id;
	newListing.name="Application Security Consultant";
	newListing.description ="Amazing Job!!";
	newListing.created=new Date();
	newListing.deadline=new Date();
	newListing.isPremium=true;
	newListing.applied=[];
	newListing.interview=[];
	newListing.offer=[];
	/**
	newListing.owner=id;
	newListing.name=listing.name;
	newListing.description =listing.description;
	newListing.created=new Date();
	newListing.deadline=listing.deadline;
	newListing.isPremium=listing.premium;
	newListing.applied=[];
	newListing.interview:[];
	newListing.offer:[];
**/
	newListing.save(function(err) {
		if (err) callback(err);
		console.log('Listing saved successfully');
		callback(false,true);
	});	
}


exports.requestApplication=function(employerId,employeeId,callback){
/**
	User.findById(employeeId,function(err,employee){
		if(err){
			callback(err);
		}else{
			if(employee.suggestions.contains(employerId)){
				callback("Already Suggested Application");
			}else{
			employee.suggestions=employee.suggestions.push(employerId);
			employee.save(function(err){
							if(err){
								callback(err);
							}else{

								User.findById(employerId,function(err,employer){
									if(err){
										callback(err);
									}else{
										employer.following.push(employeeId);
										employer.save(function(err){
											if(err){
												callback(err);
											}else{
												callback(false,true);
											}
										})
									}
								});
								
							}
						}
			
			});
				
		}
	});
	**/
}


exports.getRequestedEmployees=function(id,callback){
		User.findById(id,function(err,employer){
			if(err){
				callback(err);
			}else{
				callback(employer.following);
			}
		});
}

exports.deleteRequestedEmployees=function(employerId,employeeId,callback){
		

//TODO!!
		User.findById(employeeId,function(err,employee){
			if(err){
				callback(err);
			}else{

				callback(employer.following);
			}
		});
}


exports.getListings=function(id,callback){
	Listing.find({owner:id},function(err,listings){
		if(err){
			callback(err);
		}else{
			callback(listings);
		}
	});

}



exports.acceptForOffer=function(employeeId,callback){
		User.findById(employeeId,function(err,employee){

		});
}

//Helper Functions
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

