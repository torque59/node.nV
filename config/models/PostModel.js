var mongoose = require('mongoose');


var postSchema = mongoose.Schema({

    Owner : String,
	name: String,
	amount: Number,
	completed: boolean,
	hidden: boolean,
	created: Date

 });

