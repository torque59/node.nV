var Application  = require('../models/application'); // get our mongoose model

exports.createApplication = function(application, callback){
	var app = new Application({ 
	_creator : application.creator,
	reasonApplied: application.reasonApplied,
	background: application.background,
	_listing : application.listing
	});
}

exports.getApplicationsByEmployee = function(id, callback) {
	Application
	.find({"_creator":id})
	.populate('_listing')
	.exec(function (err, applications) {
	  if (err) {
	  	callback(err);
	  } else {
	  	callback(false, applications);
	  }
	});
}