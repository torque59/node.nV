var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); 
var config = require('../../config.js');
var userService = require("../services/userService.js");

exports.getEmployees =function(req,res){
	res.send("lol");
}

exports.getEmployers =function(req,res){
	res.send("lol");
}