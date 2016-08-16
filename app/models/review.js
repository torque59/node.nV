var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Review', new Schema({ 
	owner:String,
	listingId:String,
	name:String,
	description:String,
	rating:Number,
	created:Date
}));