var Application  = require('../models/application'); // get our mongoose model

exports.createApplication = function(application, callback){
	var app = new Application({ 
	_creator : application.creator,
	reasonApplied: application.reasonApplied,
	background: application.background,
	_listing : application.listing
	});
}