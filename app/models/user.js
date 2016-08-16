var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	username: String, 
	password: String, 
	email: String,
	answer: String,
	firstname: String,
	lastname: String,
	isPremium:Boolean,
	enabled:Boolean,
	accountNonExpired:Boolean,
	credentialsNonExpired:Boolean,
	accountNonLocked:Boolean,
	role:String, //employee | employer
	reviews:[String],
	following:[String],
	suggestions:[String]
}));