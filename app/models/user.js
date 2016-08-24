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
	applications:[String],
	interviews:[String],
	offers:[String],
	rejected:[String],
	role:Number, //employee-1 | employer-2
	reviews:[String],//for Premium Employees
	following:[String] //If employee - employers| if employer, memp
	
}));