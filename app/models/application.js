var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Application', new Schema({ 
	owner:{id:String,name:String},
	reasonApplied:String,
	background:String,
	created:Date
}));