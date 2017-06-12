var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Application = new Schema({ 
	_creator : { type: Number, ref: 'User' },
	reasonApplied:String,
	background:String,
	created:Date,
	_listing : { type: Number, ref: 'Listing' }
});

module.exports = mongoose.model('Application', Application);