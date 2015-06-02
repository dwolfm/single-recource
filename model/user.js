'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
	username: String,
	basic: {
		email: {type: String, unique: true},
		password: String
	}
});

userSchema.methods.generateHash = function(password, callback) {
	return bcrypt.hash(password, bcrypt.genSaltSync(8), null, function(err, hash) {
		if (err) {
			console.log(err);	
			callback(err,null);
		}
		callback(null, hash);	
	});
};

userSchema.methods.checkPassword = function(password, hash, callback){
	return bcrypt.compare(password, this.basic.password, function(err, res){
		if (err) {
			console.log(err);
			callback(err, null);
		}
		callback(null, res);
	});
};

userSchema.methods.generateHash = function(secret, callback){
	eat.encode({id: this._idi}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);
