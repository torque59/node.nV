var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Listing', new Schema({ 
	owner:String,
	name:String,
	description:String,
	created:Date,
	deadline:Date,
	isPremium:Boolean,
	applied:[String],
	interview:[String],
	offer:[String]
}));