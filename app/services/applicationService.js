var Application   = require('../models/application'); // get our mongoose model

exports.createApplication = function(application, callback){
	var app = new Application({ 
	_creator : { type: Number, ref: 'User' },
	reasonApplied: application.reasonApplied,
	background: application.background,
	});
}