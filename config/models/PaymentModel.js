var mongoose = require('mongoose');


var paymentSchema = mongoose.Schema({

    username : String,
	amount: Number,
	timestamp: Date,
	sender: String,
	receiver: String

 });

